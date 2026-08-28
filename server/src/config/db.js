import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri === 'your_mongodb_connection_string') {
    if (process.env.NODE_ENV === 'production') {
      logger.error('❌ [CRITICAL] MONGODB_URI is not set in production! Database persistence is disabled.');
    } else {
      logger.warn('MONGODB_URI is not set or using placeholder. Running without database persistence.');
    }
    return false;
  }

  // Reuse existing connection in serverless / hot environments
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return true;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = conn.connection.readyState === 1;
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    logger.error('❌ MongoDB connection error:', error.message);
    return false;
  }
};

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  logger.warn('MongoDB disconnected.');
});

mongoose.connection.on('reconnected', () => {
  isConnected = true;
  logger.info('MongoDB reconnected.');
});

export const getDBStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return {
    state: states[mongoose.connection.readyState] || 'unknown',
    isConnected: mongoose.connection.readyState === 1,
  };
};

export const closeDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed through app termination.');
  }
};
