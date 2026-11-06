// Vercel serverless entry point.
// Vercel runs this function for every request to /api/* (see vercel.json)
// and hands it to the same Express app used locally.
module.exports = require('../server/src/app');
