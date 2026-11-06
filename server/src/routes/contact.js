const express = require('express');
const rateLimit = require('express-rate-limit');
const { validateContact } = require('../utils/validate');
const { deliverMessage } = require('../utils/mailer');

const router = express.Router();

// At most 5 messages per IP every 15 minutes — basic spam protection
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many messages sent. Please try again in a few minutes.' },
});

router.post('/', contactLimiter, async (req, res, next) => {
  try {
    const { name, email, subject, message, website } = req.body || {};

    // Honeypot: real visitors never see or fill the hidden "website" field
    if (website) return res.status(200).json({ ok: true });

    const { errors, clean } = validateContact({ name, email, subject, message });
    if (Object.keys(errors).length) {
      return res.status(400).json({ error: 'Please check the highlighted fields.', fields: errors });
    }

    const method = await deliverMessage(clean);
    res.status(201).json({ ok: true, method });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
