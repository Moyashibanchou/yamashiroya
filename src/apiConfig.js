function normalizeApiBase(raw) {
  const v = String(raw || '').trim();
  if (!v) return '';

  if (v.startsWith('http://') || v.startsWith('https://')) {
    try {
      const u = new URL(v);
      return u.origin;
    } catch {
      return v.replace(/\/+$/, '');
    }
  }

  return v.replace(/\/+$/, '');
}

export const API_BASE_URL = normalizeApiBase(import.meta.env.VITE_API_URL);

export function apiUrl(path) {
  const p = String(path || '');
  if (!p) return API_BASE_URL;
  if (p.startsWith('http://') || p.startsWith('https://')) return p;

  const base = API_BASE_URL;
  if (!base) return p;

  const baseTrimmed = base.replace(/\/+$/, '');
  const pathTrimmed = p.startsWith('/') ? p : `/${p}`;
  return `${baseTrimmed}${pathTrimmed}`;
}

export default API_BASE_URL;
