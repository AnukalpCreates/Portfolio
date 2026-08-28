import { getCodingStats } from '../services/codingStatsService.js';

/**
 * @desc   Get Dynamic Coding / DSA Statistics
 * @route  GET /api/coding-stats
 * @access Public
 */
export const getStats = async (req, res, next) => {
  try {
    const statsData = await getCodingStats();

    res.status(200).json({
      success: true,
      data: statsData,
    });
  } catch (error) {
    next(error);
  }
};
