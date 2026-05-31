'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

// ─── CORS ──────────────────────────────────────────────────────────────────────
// Allow requests from your Vercel frontend domain.
// Update ALLOWED_ORIGIN in Render environment variables once deployed.
const allowedOrigins = [
  process.env.ALLOWED_ORIGIN,          // e.g. https://your-portfolio.vercel.app
  'http://localhost:3000',              // local dev
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// ─── API Routes ────────────────────────────────────────────────────────────────
const contactRouter = require('./routes/contact');
const aiRouter = require('./routes/ai');

app.use('/contact', contactRouter);
app.use('/ai', aiRouter);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }));

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(port, () => {
  console.log(`Backend API listening on port ${port}`);
});

module.exports = app;
