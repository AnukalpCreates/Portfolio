import { getDBStatus } from '../config/db.js';

/**
 * @desc   Check API and Database Health
 * @route  GET /api/health
 * @access Public
 */
export const getHealth = async (req, res) => {
  const dbStatus = getDBStatus();

  res.status(200).json({
    success: true,
    status: 'ok',
    service: 'portfolio-api',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: dbStatus.state,
      connected: dbStatus.isConnected,
    },
  });
};
