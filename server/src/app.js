import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

// ─── 1. Security Headers ──────────────────────────────────────
app.use(helmet());

// ─── 2. CORS Configuration ───────────────────────────────────
const rawClientUrls = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map((url) => url.trim().replace(/\/+$/, '')) : [];

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'https://anukalpbajpai.dev',
  'https://portfolio-anukalp1.vercel.app',
  ...rawClientUrls,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server, curl, Postman, mobile requests with no origin
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/+$/, '');

      // Allow if matches explicit list, or development environment, or Vercel preview domain
      if (
        allowedOrigins.includes(normalizedOrigin) ||
        process.env.NODE_ENV === 'development' ||
        /\.vercel\.app$/.test(new URL(origin).hostname)
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy does not allow access from origin: ${origin}`), false);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ─── 3. Body Parsers ──────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── 4. Rate Limiting ─────────────────────────────────────────
app.use('/api', apiLimiter);

// ─── 5. API Routes ────────────────────────────────────────────
app.use('/api', routes);

// Root route welcome/info
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Anukalp Bajpai Portfolio API',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      codingStats: '/api/coding-stats',
      projects: '/api/projects',
    },
  });
});

// ─── 6. Error Handling ────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
