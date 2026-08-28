# Anukalp Bajpai — Full Stack Portfolio (MERN)

A modern, production-grade personal portfolio and backend API built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) and styled with a custom high-performance CSS design system.

---

## 🌟 Features

- **⚡ Modern Frontend**: Built with React 18, Vite 6, custom CSS variables, and zero heavy UI libraries.
- **🛡️ Secure Backend API**: Express.js REST API with Helmet security headers, CORS domain filtering, rate limiting, and honeypot bot prevention.
- **📊 Live Coding Stats Proxy**: Server-side aggregation and caching of LeetCode and GeeksforGeeks statistics.
- **📬 Functional Contact Form**: Validated submissions stored in MongoDB with asynchronous email notifications via Nodemailer.
- **📱 Fully Responsive**: Pixel-perfect from 360px mobile viewports to 1440px+ ultra-wide screens.
- **♿ Accessible**: ARIA labels, semantic HTML, skip-to-content links, and `prefers-reduced-motion` compliance.

---

## 🏗️ Architecture

```
Portfolio Website/
├── server/                         # Express.js REST API Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # MongoDB connection & graceful shutdown
│   │   ├── controllers/
│   │   │   ├── contactController.js
│   │   │   ├── codingStatsController.js
│   │   │   └── healthController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js     # Centralized error handler & 404
│   │   │   ├── rateLimiter.js      # Rate limiting (express-rate-limit)
│   │   │   └── validator.js        # Request validation & honeypot anti-spam
│   │   ├── models/
│   │   │   ├── ContactMessage.js   # MongoDB contact message schema
│   │   │   └── CodingStatsCache.js # MongoDB cached stats schema
│   │   ├── routes/
│   │   │   ├── contactRoutes.js
│   │   │   ├── codingStatsRoutes.js
│   │   │   ├── healthRoutes.js
│   │   │   └── index.js            # Main API router (/api/*)
│   │   ├── services/
│   │   │   ├── codingStatsService.js # LeetCode + GFG multi-tier stats fetcher
│   │   │   └── emailService.js     # Nodemailer email notification service
│   │   ├── utils/
│   │   │   └── logger.js           # Structured console logger
│   │   ├── app.js                  # Express middleware & app configuration
│   │   └── server.js               # Server entry point
│   ├── package.json
│   └── .env.example                # Backend environment template
├── src/                            # React.js Frontend
│   ├── components/                 # UI components
│   ├── data/
│   │   └── portfolioData.js        # Centralized static portfolio data
│   ├── hooks/                      # Custom React hooks
│   ├── services/
│   │   └── codingStatsService.js   # Frontend API client with fallback chain
│   ├── styles/
│   │   └── index.css               # Design system & responsive styles
│   ├── App.jsx
│   └── main.jsx
├── .env.example                    # Frontend environment template
├── vite.config.js                  # Vite configuration & dev proxy
├── package.json                    # Root scripts
└── README.md
```

---

## 🚀 Quick Start

### 1. Prerequisites

- **Node.js**: v18.0.0 or later
- **MongoDB**: Local MongoDB instance or free [MongoDB Atlas Cluster](https://www.mongodb.com/cloud/atlas)

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/AnukalpCreates/portfolio.git
cd portfolio

# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..
```

### 3. Environment Configuration

Create `.env` in the `server/` directory:

```bash
cp server/.env.example server/.env
```

Edit `server/.env` with your credentials:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173

# Email notifications (Optional)
ADMIN_EMAIL=anukalpbajpai25@gmail.com
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

*(Optional)* Create `.env` in root for frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Running Locally

**Terminal 1 — Backend Server:**
```bash
npm run server
# Starts backend at http://localhost:5000
```

**Terminal 2 — Frontend Client:**
```bash
npm run dev
# Starts frontend at http://localhost:5173
```

---

## 📡 API Reference

Base URL: `http://localhost:5000/api`

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Description**: Returns API health, uptime timestamp, and MongoDB connection status.
- **Response**: `200 OK`
```json
{
  "success": true,
  "status": "ok",
  "service": "portfolio-api",
  "timestamp": "2026-08-28T10:13:25.089Z",
  "environment": "development",
  "database": {
    "status": "connected",
    "connected": true
  }
}
```

### 2. Submit Contact Form
- **Endpoint**: `POST /api/contact`
- **Rate Limit**: 5 requests per 15 minutes per IP
- **Security**: Anti-spam honeypot verification, input validation & sanitization
- **Payload**:
```json
{
  "name": "Jane Developer",
  "email": "jane@example.com",
  "message": "Hi Anukalp, I would love to connect with you regarding full-stack opportunities!"
}
```
- **Response**: `201 Created`
```json
{
  "success": true,
  "message": "Your message has been sent successfully."
}
```

### 3. Get Coding Statistics
- **Endpoint**: `GET /api/coding-stats`
- **Description**: Retrieves dynamic problem-solving statistics for LeetCode and GeeksforGeeks with 30-minute server-side MongoDB caching.
- **Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "codolio": {
      "username": "@anukalpcodes",
      "questionsSolved": 198,
      "activeDays": 92,
      "primaryLanguage": "C++",
      "focus": "DSA + CP"
    },
    "leetcode": {
      "username": "AnukalpCreates",
      "questionsSolved": 93,
      "rating": null,
      "breakdown": { "easy": 35, "medium": 53, "hard": 5 }
    },
    "geeksforgeeks": {
      "username": "anukalpcodes",
      "questionsSolved": 105,
      "breakdown": { "basic": 11, "easy": 41, "medium": 48, "hard": 5 }
    },
    "source": "api",
    "lastUpdated": "2026-08-28T10:14:34.101Z"
  }
}
```

---

## 🚢 Production Deployment

### Backend Deployment (Render / Railway / VPS)
1. Set Root Directory to `server/` (or run `npm start` from `server/`).
2. Add environment variables:
   - `NODE_ENV=production`
   - `PORT=5000` (or platform default)
   - `MONGODB_URI=<your_atlas_connection_string>`
   - `CLIENT_URL=https://your-portfolio-domain.com`
   - `ADMIN_EMAIL=anukalpbajpai25@gmail.com`
   - `EMAIL_USER` & `EMAIL_PASSWORD` (Gmail App Password)

### Frontend Deployment (Vercel / Netlify / Cloudflare)
1. Build command: `npm run build`
2. Output directory: `dist`
3. Environment variables:
   - `VITE_API_URL=https://your-backend-api.onrender.com/api`

---

## 🔒 Security Best Practices

- **Helmet**: Sets HTTP security headers (X-Frame-Options, X-Content-Type-Options, DNS prefetch control).
- **CORS**: Enforces origin allowlist between frontend and backend.
- **Rate Limiting**: Defends endpoints against brute-force and denial-of-service spam.
- **Honeypot Protection**: Rejects automated bot submissions invisibly.
- **Data Sanitization**: Escapes strings to protect against XSS and injection attacks.
- **Zero Exposed Secrets**: No credentials in client-side bundles or Git history.

---

## 👤 Author

**Anukalp Bajpai**
- **Role**: Full Stack Developer (MERN)
- **Education**: B.Tech Computer Science & Engineering — Lovely Professional University
- **Email**: [anukalpbajpai25@gmail.com](mailto:anukalpbajpai25@gmail.com)
- **GitHub**: [@AnukalpCreates](https://github.com/AnukalpCreates)
- **LinkedIn**: [Anukalp Bajpai](https://www.linkedin.com/in/anukalp-bajpai-16b1a8372/)
- **LeetCode**: [AnukalpCreates](https://leetcode.com/u/AnukalpCreates/)
- **GeeksforGeeks**: [anukalpcodes](https://www.geeksforgeeks.org/profile/anukalpcodes)
- **Codolio**: [anukalpcodes](https://codolio.com/profile/anukalpcodes)
