/**
 * vehicles/[id]/[slug]/page.tsx — Ruta con slug decorativo SEO.
 *
 * El slug es completamente ignorado en la lógica; solo sirve para que
 * Google indexe URLs amigables como /vehicles/123/toyota-corolla-2022.
 * El backend solo recibe el id numérico.
 *
 * Ejemplo: /vehicles/42/bmw-serie-3-2021
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Reutilizamos el mismo componente de la ruta sin slug
import VehicleDetailPage, {
  generateMetadata as baseGenerateMetadata,
} from '@/app/vehicles/[id]/page';

interface SlugPageProps {
  params: Promise<{ id: string; slug: string }>;
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { id } = await params;
  // Delegar al generador de la página base (sin slug)
  return baseGenerateMetadata({ params: Promise.resolve({ id }) });
}

export default async function VehicleSlugPage({ params }: SlugPageProps) {
  const { id } = await params;
  const vehicleId = Number(id);

  if (Number.isNaN(vehicleId)) {
    notFound();
  }

  // Delegar al componente base pasando solo el id
  return VehicleDetailPage({ params: Promise.resolve({ id }) });
}
