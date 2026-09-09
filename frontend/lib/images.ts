import { PUBLIC_API_URL } from '@/lib/config';
import type { Vehicle } from '@/types/vehicle';

/**
 * Convierte URLs absolutas del backend en rutas relativas /media/...
 * para que next/image las sirva vía rewrite al backend (Docker-safe).
 */
export function normalizeMediaUrl(url: string): string {
  if (!url) {
    return '';
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return '';
  }

  if (trimmed.startsWith('/media/')) {
    return trimmed;
  }

  const mediaMatch = trimmed.match(/^(?:https?:\/\/[^/]+)?(\/media\/.*)$/i);
  if (mediaMatch) {
    return mediaMatch[1];
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.pathname.startsWith('/media/')) {
      return parsed.pathname;
    }
  } catch {
    // URL relativa o sin protocolo
  }

  return trimmed
    .replace('http://backend:8000', '')
    .replace('https://backend:8000', '')
    .replace('http://localhost:8000', '')
    .replace('https://localhost:8000', '')
    .replace(PUBLIC_API_URL.replace(/\/$/, ''), '')
    .replace(/^https?:\/\/[^/]+(?=\/media\/)/, '');
}

export function getVehicleImageUrl(vehicle: Vehicle): string | null {
  const url = vehicle.images[0];
  return url ? normalizeMediaUrl(url) : null;
}

export function getVehicleImages(vehicle: Vehicle): string[] {
  return vehicle.images.map(normalizeMediaUrl);
}
