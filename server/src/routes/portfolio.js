const express = require('express');
const data = require('../data/portfolio');

const router = express.Router();

// Everything the homepage needs, in one request
router.get('/portfolio', (req, res) => {
  res.json(data);
});

router.get('/projects', (req, res) => {
  res.json(data.projects);
});

router.get('/projects/:id', (req, res) => {
  const project = data.projects.find((p) => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

router.get('/certifications', (req, res) => {
  res.json(data.certifications);
});

module.exports = router;
