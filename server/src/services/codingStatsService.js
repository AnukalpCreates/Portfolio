import { CodingStatsCache } from '../models/CodingStatsCache.js';
import { logger } from '../utils/logger.js';
import mongoose from 'mongoose';

// ─── Constants & Configuration ─────────────────────────────────
const LEETCODE_USERNAME = 'AnukalpCreates';
const GFG_USERNAME = 'anukalpcodes';
const CODOLIO_USERNAME = '@anukalpcodes';

const LEETCODE_API = `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`;
const GFG_API = `https://gfgstatscard.vercel.app/${GFG_USERNAME}?raw=true`;

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

// ─── Verified Fallback Data ────────────────────────────────────
const FALLBACK_STATS = {
  codolio: {
    username: CODOLIO_USERNAME,
    questionsSolved: 198,
    activeDays: 92,
    primaryLanguage: 'C++',
    focus: 'DSA + CP',
  },
  leetcode: {
    username: LEETCODE_USERNAME,
    questionsSolved: 93,
    rating: null,
    breakdown: {
      easy: 35,
      medium: 53,
      hard: 5,
    },
  },
  geeksforgeeks: {
    username: GFG_USERNAME,
    questionsSolved: 105,
    breakdown: {
      basic: 11,
      easy: 41,
      medium: 48,
      hard: 5,
    },
  },
  summary: {
    questionsSolved: 198,
    activeDays: 92,
    primaryLanguage: 'C++',
    focus: 'DSA + CP',
  },
  source: 'fallback',
  lastUpdated: null,
};

// ─── In-Memory Cache (Fallback if DB is offline) ───────────────
let memoryCache = {
  data: null,
  timestamp: 0,
  source: 'fallback',
};

// ─── External Fetchers ─────────────────────────────────────────

async function fetchLeetCodeStats() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(LEETCODE_API, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`LeetCode API HTTP ${res.status}`);
    const data = await res.json();
    return {
      total: data.solvedProblem || 0,
      easy: data.easySolved || 0,
      medium: data.mediumSolved || 0,
      hard: data.hardSolved || 0,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    logger.warn(`[CodingStatsService] LeetCode fetch failed: ${error.message}`);
    return null;
  }
}

async function fetchGFGStats() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(GFG_API, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`GFG API HTTP ${res.status}`);
    const data = await res.json();
    const basic = data.Basic || 0;
    const easy = data.Easy || 0;
    const medium = data.Medium || 0;
    const hard = data.Hard || 0;
    return {
      total: basic + easy + medium + hard,
      basic,
      easy,
      medium,
      hard,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    logger.warn(`[CodingStatsService] GFG fetch failed: ${error.message}`);
    return null;
  }
}

// ─── Main Service Functions ────────────────────────────────────

/**
 * Fetch and normalize coding stats with multi-layer caching (DB -> Memory -> Fallback)
 */
export async function getCodingStats() {
  const isDbConnected = mongoose.connection.readyState === 1;

  // 1. Check MongoDB Cache if DB is connected
  if (isDbConnected) {
    try {
      const cached = await CodingStatsCache.findOne({ key: 'coding_stats' });
      if (cached && cached.data) {
        const age = Date.now() - new Date(cached.lastFetched).getTime();
        if (age < CACHE_TTL_MS) {
          return {
            ...cached.data,
            source: 'cache',
          };
        }
      }
    } catch (err) {
      logger.warn(`[CodingStatsService] DB cache lookup failed: ${err.message}`);
    }
  } else {
    // Check in-memory cache
    if (memoryCache.data && Date.now() - memoryCache.timestamp < CACHE_TTL_MS) {
      return {
        ...memoryCache.data,
        source: 'cache',
      };
    }
  }

  // 2. Fetch Live Stats from external APIs
  logger.info('[CodingStatsService] Fetching fresh stats from LeetCode & GFG...');
  const [lcData, gfgData] = await Promise.all([
    fetchLeetCodeStats(),
    fetchGFGStats(),
  ]);

  if (lcData || gfgData) {
    const lcTotal = lcData?.total ?? FALLBACK_STATS.leetcode.questionsSolved;
    const gfgTotal = gfgData?.total ?? FALLBACK_STATS.geeksforgeeks.questionsSolved;
    const totalQuestions = lcTotal + gfgTotal;

    const normalizedData = {
      codolio: {
        username: CODOLIO_USERNAME,
        questionsSolved: totalQuestions,
        activeDays: FALLBACK_STATS.codolio.activeDays,
        primaryLanguage: 'C++',
        focus: 'DSA + CP',
      },
      leetcode: {
        username: LEETCODE_USERNAME,
        questionsSolved: lcTotal,
        rating: null,
        breakdown: {
          easy: lcData?.easy ?? FALLBACK_STATS.leetcode.breakdown.easy,
          medium: lcData?.medium ?? FALLBACK_STATS.leetcode.breakdown.medium,
          hard: lcData?.hard ?? FALLBACK_STATS.leetcode.breakdown.hard,
        },
      },
      geeksforgeeks: {
        username: GFG_USERNAME,
        questionsSolved: gfgTotal,
        breakdown: {
          basic: gfgData?.basic ?? FALLBACK_STATS.geeksforgeeks.breakdown.basic,
          easy: gfgData?.easy ?? FALLBACK_STATS.geeksforgeeks.breakdown.easy,
          medium: gfgData?.medium ?? FALLBACK_STATS.geeksforgeeks.breakdown.medium,
          hard: gfgData?.hard ?? FALLBACK_STATS.geeksforgeeks.breakdown.hard,
        },
      },
      summary: {
        questionsSolved: totalQuestions,
        activeDays: FALLBACK_STATS.codolio.activeDays,
        primaryLanguage: 'C++',
        focus: 'DSA + CP',
      },
      source: 'api',
      lastUpdated: new Date().toISOString(),
    };

    // Update in-memory cache
    memoryCache = {
      data: normalizedData,
      timestamp: Date.now(),
      source: 'api',
    };

    // Update MongoDB Cache if DB is connected
    if (isDbConnected) {
      try {
        await CodingStatsCache.findOneAndUpdate(
          { key: 'coding_stats' },
          {
            data: normalizedData,
            source: 'api',
            lastFetched: new Date(),
          },
          { upsert: true, new: true }
        );
        logger.info('[CodingStatsService] Stats cache updated in MongoDB.');
      } catch (err) {
        logger.warn(`[CodingStatsService] Could not save cache to MongoDB: ${err.message}`);
      }
    }

    return normalizedData;
  }

  // 3. Live fetch failed — try returning stale cache
  if (memoryCache.data) {
    logger.warn('[CodingStatsService] Using stale in-memory cache.');
    return {
      ...memoryCache.data,
      source: 'cache',
    };
  }

  if (isDbConnected) {
    try {
      const staleDb = await CodingStatsCache.findOne({ key: 'coding_stats' });
      if (staleDb && staleDb.data) {
        logger.warn('[CodingStatsService] Using stale database cache.');
        return {
          ...staleDb.data,
          source: 'cache',
        };
      }
    } catch {
      // ignore
    }
  }

  // 4. Return Fallback Data
  logger.warn('[CodingStatsService] All live fetches and caches unavailable. Serving fallback data.');
  return FALLBACK_STATS;
}
