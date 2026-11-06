const fs = require('fs/promises');
const path = require('path');
const nodemailer = require('nodemailer');

const MESSAGES_FILE = path.join(__dirname, '..', '..', 'data', 'messages.json');

const smtpConfigured = () => Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

let transporter;
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

/** Saves a message to server/data/messages.json (used when SMTP isn't configured). */
async function saveToFile(msg) {
  await fs.mkdir(path.dirname(MESSAGES_FILE), { recursive: true });
  let list = [];
  try {
    list = JSON.parse(await fs.readFile(MESSAGES_FILE, 'utf8'));
  } catch {
    list = [];
  }
  list.push({ ...msg, receivedAt: new Date().toISOString() });
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(list, null, 2));
}

/**
 * Delivers a contact message by email when SMTP is configured, otherwise stores it locally.
 * Returns "email" or "stored".
 */
async function deliverMessage({ name, email, subject, message }) {
  if (!smtpConfigured()) {
    try {
      await saveToFile({ name, email, subject, message });
      console.log(`[contact] Message from ${name} <${email}> saved to data/messages.json`);
      return 'stored';
    } catch {
      // Hosts like Vercel don't allow writing files; fall back to the server logs
      console.log('[contact] SMTP not configured — message logged instead:', JSON.stringify({ name, email, subject, message }));
      return 'logged';
    }
  }

  await getTransporter().sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO || process.env.SMTP_USER,
    replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
    subject: `[Portfolio] ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
  return 'email';
}

module.exports = { deliverMessage };
