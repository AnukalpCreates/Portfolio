import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB, closeDB } from './config/db.js';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const server = app.listen(PORT, () => {
  logger.info(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  logger.info(`API Base URL: http://localhost:${PORT}/api`);
});

// ─── Graceful Shutdown ─────────────────────────────────────────

const shutdown = async (signal) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);

  server.close(async () => {
    logger.info('HTTP server closed.');
    await closeDB();
    logger.info('Process terminated cleanly.');
    process.exit(0);
  });

  // Force close if graceful shutdown takes too long
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// ─── Global Error Safety Nets ──────────────────────────────────

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err.message || err);
  if (err.stack) logger.debug(err.stack);
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err.message || err);
  if (err.stack) logger.debug(err.stack);
  process.exit(1);
});
