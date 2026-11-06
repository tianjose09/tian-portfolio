const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = { name: 80, email: 120, subject: 120, message: 3000 };

/**
 * Validates and trims contact form input.
 * Returns { errors, clean } — errors is an object keyed by field name.
 */
function validateContact(input) {
  const clean = {};
  const errors = {};

  for (const key of Object.keys(LIMITS)) {
    const value = typeof input[key] === 'string' ? input[key].trim() : '';
    clean[key] = value;
    if (value.length > LIMITS[key]) errors[key] = `Keep this under ${LIMITS[key]} characters.`;
  }

  if (clean.name.length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(clean.email)) errors.email = 'Please enter a valid email address.';
  if (clean.message.length < 10) errors.message = 'Your message should be at least 10 characters.';
  if (!clean.subject) clean.subject = 'New message from your portfolio';

  return { errors, clean };
}

module.exports = { validateContact, LIMITS };
