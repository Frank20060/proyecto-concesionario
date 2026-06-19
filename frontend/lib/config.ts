// En producción, define NEXT_PUBLIC_API_URL en el entorno de despliegue.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';
