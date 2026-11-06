/**
 * The Express app (routes + middleware), without starting a server.
 * - Locally, server/src/index.js imports this and calls app.listen().
 * - On Vercel, api/index.js exports this as a serverless function.
 *
 * Endpoints:
 * - GET  /api/health       → simple status check
 * - GET  /api/portfolio    → all portfolio content (profile, skills, projects, ...)
 * - GET  /api/projects     → project list
 * - GET  /api/projects/:id → single project
 * - POST /api/contact      → contact form submission
 */
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');

const portfolioRoutes = require('./routes/portfolio');
const contactRoutes = require('./routes/contact');

const app = express();
const isProd = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL);

// Behind Vercel's (or any host's) proxy: needed so rate limiting sees the real visitor IP
app.set('trust proxy', 1);
app.disable('x-powered-by');

// ---- Middleware ----
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '20kb' }));

// ---- API routes ----
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));
app.use('/api', portfolioRoutes);
app.use('/api/contact', contactRoutes);

// Unknown API routes → JSON 404
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

// ---- Serve the built React app (when running `npm start` locally or on a Node host) ----
// On Vercel the built site is served by Vercel itself, so this is skipped there.
const clientDist = path.join(__dirname, '..', '..', 'client', 'dist');
if (!process.env.VERCEL && fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => res.sendFile(path.join(clientDist, 'index.html')));
}

// ---- Error handler ----
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: isProd ? 'Something went wrong.' : err.message });
});

module.exports = app;
