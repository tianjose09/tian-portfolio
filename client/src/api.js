// Small helpers for talking to the Express API.

export async function fetchPortfolio() {
  const res = await fetch('/api/portfolio');
  if (!res.ok) throw new Error(`Failed to load portfolio (${res.status})`);
  return res.json();
}

export async function sendContactMessage(payload) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.error || 'Message could not be sent.');
    error.fields = data.fields || {};
    throw error;
  }
  return data;
}
