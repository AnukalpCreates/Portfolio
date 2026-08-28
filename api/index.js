import app from '../server/src/app.js';
import { connectDB } from '../server/src/config/db.js';

/**
 * Vercel Serverless Function entry point
 * Connects to MongoDB on warm starts and passes the request to Express.
 */
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
