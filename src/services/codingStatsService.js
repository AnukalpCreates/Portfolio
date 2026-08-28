/*
 * Coding Stats Service — LIVE DATA
 * =================================
 * Fetches real-time stats from LeetCode and GeeksforGeeks
 * via publicly available community API proxies.
 *
 * Data sources:
 *   - LeetCode: alfa-leetcode-api (community-maintained, public, no auth needed)
 *   - GFG: gfgstatscard (community-maintained, public, no auth needed)
 *
 * Architecture:
 *   Frontend → Community API proxies → LeetCode/GFG → Aggregated stats → UI
 *
 * No API keys or secrets needed — these are public profile endpoints.
 */

import { API_ENDPOINTS } from '../config/api';

// ─── Configuration ──────────────────────────────────────────
const LEETCODE_USERNAME = 'AnukalpCreates';
const GFG_USERNAME = 'anukalpcodes';
const CODOLIO_USERNAME = '@anukalpcodes';

const LEETCODE_API = `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`;
const GFG_API = `https://gfgstatscard.vercel.app/${GFG_USERNAME}?raw=true`;

// ─── Fallback Data ──────────────────────────────────────────
const FALLBACK_STATS = {
  codolio: {
    username: CODOLIO_USERNAME,
    questionsSolved: 198,
    activeDays: 92,
    primaryLanguage: 'C++',
    focus: 'DSA + CP',
    lastUpdated: null,
    breakdown: {
      leetcode: { total: 93, easy: 35, medium: 53, hard: 5 },
      gfg: { total: 105, basic: 11, easy: 41, medium: 48, hard: 5 },
    },
  },
};

// ─── Cache ──────────────────────────────────────────────────
const CACHE_KEY = 'portfolio_coding_stats';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

function getCachedStats() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    const age = Date.now() - cached.timestamp;
    if (age < CACHE_TTL_MS) {
      return { data: cached.data, stale: false };
    }
    // Cache expired but still usable as stale fallback
    return { data: cached.data, stale: true };
  } catch {
    return null;
  }
}

function setCachedStats(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // localStorage unavailable
  }
}

// ─── Fetchers ───────────────────────────────────────────────

async function fetchFromBackend() {
  const response = await fetch(API_ENDPOINTS.codingStats, {
    signal: AbortSignal.timeout(6000),
  });

  if (!response.ok) throw new Error(`Backend API HTTP ${response.status}`);
  const data = await response.json();

  if (data.success && data.data) {
    return {
      stats: {
        codolio: data.data.codolio || FALLBACK_STATS.codolio,
      },
      source: data.data.source || 'api',
      lastUpdated: data.data.lastUpdated ? new Date(data.data.lastUpdated) : new Date(),
      error: null,
    };
  }
  throw new Error('Invalid response structure from backend');
}

async function fetchLeetCodeStats() {
  const response = await fetch(LEETCODE_API, {
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`LeetCode API: ${response.status}`);
  const data = await response.json();
  return {
    total: data.solvedProblem || 0,
    easy: data.easySolved || 0,
    medium: data.mediumSolved || 0,
    hard: data.hardSolved || 0,
  };
}

async function fetchGFGStats() {
  const response = await fetch(GFG_API, {
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`GFG API: ${response.status}`);
  const data = await response.json();
  return {
    total: (data.Basic || 0) + (data.Easy || 0) + (data.Medium || 0) + (data.Hard || 0),
    basic: data.Basic || 0,
    easy: data.Easy || 0,
    medium: data.Medium || 0,
    hard: data.Hard || 0,
  };
}

// ─── Public API ─────────────────────────────────────────────

/**
 * Fetch live coding stats.
 * Priority: Backend API → Direct Community Proxies → localStorage Cache → Static Fallback.
 */
export async function fetchCodingStats() {
  // 1. Try Backend API first
  try {
    const backendResult = await fetchFromBackend();
    setCachedStats(backendResult);
    return backendResult;
  } catch (backendErr) {
    console.info('[CodingStats] Backend API fetch skipped/failed, trying direct community APIs:', backendErr.message);
  }

  // 2. Try direct community APIs (LeetCode + GFG)
  try {
    const [leetcode, gfg] = await Promise.allSettled([
      fetchLeetCodeStats(),
      fetchGFGStats(),
    ]);

    const lcData = leetcode.status === 'fulfilled' ? leetcode.value : null;
    const gfgData = gfg.status === 'fulfilled' ? gfg.value : null;

    // At least one source must succeed
    if (lcData || gfgData) {
      const lcTotal = lcData?.total || FALLBACK_STATS.codolio.breakdown.leetcode.total;
      const gfgTotal = gfgData?.total || FALLBACK_STATS.codolio.breakdown.gfg.total;

      const result = {
        stats: {
          codolio: {
            username: CODOLIO_USERNAME,
            questionsSolved: lcTotal + gfgTotal,
            activeDays: FALLBACK_STATS.codolio.activeDays,
            primaryLanguage: 'C++',
            focus: 'DSA + CP',
            lastUpdated: new Date().toISOString(),
            breakdown: {
              leetcode: lcData || FALLBACK_STATS.codolio.breakdown.leetcode,
              gfg: gfgData || FALLBACK_STATS.codolio.breakdown.gfg,
            },
          },
        },
        source: 'api',
        lastUpdated: new Date(),
        error: null,
      };

      setCachedStats(result);
      return result;
    }
  } catch (err) {
    console.warn('[CodingStats] Direct API fetch failed:', err.message);
  }

  // 3. Try client localStorage cache
  const cached = getCachedStats();
  if (cached?.data?.stats) {
    return {
      ...cached.data,
      source: cached.stale ? 'cache' : 'cache',
      error: 'Using cached data — live fetch failed',
    };
  }

  // 4. Fallback
  return {
    stats: FALLBACK_STATS,
    source: 'fallback',
    lastUpdated: null,
    error: null,
  };
}

/**
 * Get the primary Codolio stats from a stats result.
 */
export function getCodolioStats(statsResult) {
  return statsResult?.stats?.codolio || FALLBACK_STATS.codolio;
}

/**
 * Format a lastUpdated date for display.
 */
export function formatLastUpdated(date) {
  if (!date) return null;
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date instanceof Date ? date : new Date(date));
  } catch {
    return null;
  }
}
