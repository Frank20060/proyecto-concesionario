import type { MetadataRoute } from 'next';

import { getVehicles } from '@/lib/api/vehicles';
import { siteConfig } from '@/lib/site.config';
import { vehicleUrl } from '@/lib/utils';

/**
 * sitemap.ts — Genera /sitemap.xml dinámicamente.
 *
 * Incluye:
 * - Homepage (prioridad 1.0, diaria)
 * - Todas las fichas de vehículos disponibles (prioridad 0.8, semanal)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let vehicles: Awaited<ReturnType<typeof getVehicles>> = [];

  try {
    vehicles = await getVehicles();
  } catch {
    // Si la API no está disponible, devolvemos solo la homepage
  }

  const vehicleEntries: MetadataRoute.Sitemap = vehicles.map((vehicle) => ({
    url: `${siteConfig.url}${vehicleUrl(vehicle.id)}`,
    lastModified: new Date(vehicle.created_at),
    changeFrequency: 'weekly',
    priority: vehicle.is_available ? 0.9 : 0.4,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/catalogo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/sobre-nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/preguntas-frecuentes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...vehicleEntries,
  ];
}
