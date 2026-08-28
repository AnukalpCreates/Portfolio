/**
 * Centralized API Configuration & Endpoints
 * Supports both development (proxied /api or localhost:5000) and production deployment.
 */

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/+$/, '');
  }
  return '/api';
};

export const API_BASE_URL = getBaseUrl();

export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/health`,
  contact: `${API_BASE_URL}/contact`,
  codingStats: `${API_BASE_URL}/coding-stats`,
  projects: `${API_BASE_URL}/projects`,
};

/**
 * Standardized fetch helper with timeout and JSON parsing
 */
export async function apiRequest(endpoint, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(endpoint, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    clearTimeout(timeoutId);
    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}
