/**
 * Starts the portfolio API server locally (npm run dev / npm start).
 * All routes and middleware live in app.js.
 */
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
