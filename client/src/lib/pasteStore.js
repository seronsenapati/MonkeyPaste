// Netlify Functions — no API_URL needed, functions live on the same domain
const FUNCTIONS_BASE = '/.netlify/functions';

// Generate a random 6-digit numeric code (client-side only, for display purposes)
export const generateCode = () => {
  const chars = '0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Save paste via Netlify Function — returns the 6-digit code
export const savePaste = async (content) => {
  const res = await fetch(`${FUNCTIONS_BASE}/create-paste`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to save paste');
  }

  const data = await res.json();
  return data.code;
};

// Get paste content by code via Netlify Function
export const getPaste = async (code) => {
  try {
    const res = await fetch(`${FUNCTIONS_BASE}/get-paste?code=${code}`);

    if (res.status === 404) return null;

    if (!res.ok) throw new Error('Failed to retrieve paste');

    const data = await res.json();
    return data.content || null;
  } catch (error) {
    console.error('Error retrieving paste:', error);
    return null;
  }
};

// Check if paste exists
export const pasteExists = async (code) => {
  try {
    const res = await fetch(`${FUNCTIONS_BASE}/get-paste?code=${code}`);
    return res.ok;
  } catch {
    return false;
  }
};

// Generate shareable link
export const generateLink = (code) => {
  return `${window.location.origin}/paste/${code}`;
};

// Delete paste
export const deletePaste = async (code) => {
  try {
    const res = await fetch(`${FUNCTIONS_BASE}/delete-paste?code=${code}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch (error) {
    console.error('Error deleting paste:', error);
    return false;
  }
};
