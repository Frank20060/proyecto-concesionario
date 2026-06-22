import { PUBLIC_API_URL } from '@/lib/config';
import type { Vehicle } from '@/types/vehicle';

/**
 * Convierte URLs absolutas del backend en rutas relativas /media/...
 * para que next/image las sirva vía rewrite al backend (Docker-safe).
 */
export function normalizeMediaUrl(url: string): string {
  if (url.startsWith('/media/')) {
    return url;
  }

  try {
    const parsed = new URL(url);
    if (parsed.pathname.startsWith('/media/')) {
      return parsed.pathname;
    }
  } catch {
    // URL relativa sin barra inicial
  }

  return url
    .replace('http://backend:8000', '')
    .replace('https://backend:8000', '')
    .replace(PUBLIC_API_URL, '')
    .replace(/^https?:\/\/localhost:8000/, '');
}

export function getVehicleImageUrl(vehicle: Vehicle): string | null {
  const url = vehicle.images[0];
  return url ? normalizeMediaUrl(url) : null;
}

export function getVehicleImages(vehicle: Vehicle): string[] {
  return vehicle.images.map(normalizeMediaUrl);
}
