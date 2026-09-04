// Thin API client. In dev, /api is proxied to the Express server (see
// vite.config.js). In production, set VITE_API_BASE to the API origin.
const BASE = import.meta.env.VITE_API_BASE || '';

async function request(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    const err = new Error(`Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export const getProducts = () => request('/api/products');
export const getProduct = (slug) => request(`/api/products/${slug}`);
