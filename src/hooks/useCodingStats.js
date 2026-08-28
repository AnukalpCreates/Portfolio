import { useState, useEffect, useCallback } from 'react'
import { fetchCodingStats, getCodolioStats, formatLastUpdated } from '../services/codingStatsService'

/**
 * React hook for dynamic coding statistics.
 *
 * Returns:
 *   - stats: { questionsSolved, activeDays, primaryLanguage, focus, username }
 *   - loading: boolean (true during initial fetch)
 *   - source: 'api' | 'cache' | 'fallback'
 *   - lastUpdated: formatted string or null
 *   - error: string or null
 *   - refresh: () => void (manual refresh function)
 */
export function useCodingStats() {
  const [result, setResult] = useState({
    stats: null,
    loading: true,
    source: 'fallback',
    lastUpdated: null,
    error: null,
  })

  const load = useCallback(async () => {
    try {
      const data = await fetchCodingStats()
      const codolio = getCodolioStats(data)
      setResult({
        stats: codolio,
        loading: false,
        source: data.source,
        lastUpdated: formatLastUpdated(data.lastUpdated),
        error: data.error,
      })
    } catch (err) {
      console.error('[useCodingStats] Unexpected error:', err)
      setResult((prev) => ({
        ...prev,
        loading: false,
        error: 'Failed to load statistics',
      }))
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return {
    ...result,
    refresh: load,
  }
}
