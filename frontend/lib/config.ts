// API_INTERNAL_URL: peticiones server-side dentro de Docker (http://backend:8000)
// NEXT_PUBLIC_API_URL / PUBLIC_API_URL: URLs accesibles desde el navegador
export const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export const API_BASE_URL =
  process.env.API_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:8000';
