import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import VehicleGallery from '@/components/VehicleGallery';
import { getVehicle } from '@/lib/api/vehicles';
import { formatDate, formatKm, formatPrice } from '@/lib/format';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface VehicleDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: VehicleDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicleId = Number(id);
  if (Number.isNaN(vehicleId)) return {};

  try {
    const vehicle = await getVehicle(vehicleId);
    const price = formatPrice(vehicle.price);
    const title = `${vehicle.brand} ${vehicle.model} ${vehicle.year} · ${price}`;
    const description = `${vehicle.brand} ${vehicle.model} ${vehicle.year}. ${formatKm(vehicle.km)} · ${vehicle.description?.slice(0, 120) ?? ''}`;
    return {
      title,
      description,
    };
  } catch {
    return { title: 'Vehículo no encontrado' };
  }
}

export default async function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const { id } = await params;
  const vehicleId = Number(id);

  if (Number.isNaN(vehicleId)) {
    notFound();
  }

  let vehicle;
  try {
    vehicle = await getVehicle(vehicleId);
  } catch {
    notFound();
  }

  const specs = [
    { label: 'Marca', value: vehicle.brand },
    { label: 'Modelo', value: vehicle.model },
    { label: 'Año', value: String(vehicle.year) },
    { label: 'Kilometraje', value: formatKm(vehicle.km) },
    { label: 'Publicado', value: formatDate(vehicle.created_at) },
  ];
  const price = formatPrice(vehicle.price);
  const whatsappUrl = buildWhatsAppUrl({
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    price,
  });

  return (
    <article className="vehicle-detail-page bg-[#30343b]">
      <div className="vehicle-detail-bar border-b border-stone-200 bg-[#292d33]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-sm text-stone-500 transition-colors hover:text-stone-900"
          >
            ← Volver al catálogo
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <VehicleGallery
              images={vehicle.images}
              alt={`${vehicle.brand} ${vehicle.model}`}
            />

            <div className="vehicle-detail-surface mt-10 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
              <h2 className="text-sm font-medium uppercase tracking-wider text-stone-400">
                Descripción del vehículo
              </h2>
              <p className="mt-3 text-base leading-relaxed text-stone-600">
                {vehicle.description}
              </p>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium uppercase tracking-wider text-stone-400">
                Ficha técnica
              </h2>
              <dl className="vehicle-detail-table mt-4 overflow-hidden rounded-xl border border-stone-200 bg-[#292d33] shadow-sm">
                {specs.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-2 px-4 py-3.5 even:bg-[#343941] sm:px-5"
                  >
                    <dt className="text-sm text-stone-500">{item.label}</dt>
                    <dd className="text-sm font-medium text-stone-900">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="vehicle-detail-surface sticky top-8 overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-xl sm:p-8">
              <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                {vehicle.brand}
              </p>
              <h1
                className="mt-1 font-serif text-3xl font-semibold text-stone-900"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                {vehicle.model}
              </h1>
              <p className="mt-1 text-stone-500">{vehicle.year}</p>

              {!vehicle.is_available && (
                <div className="mt-4 border border-stone-300 bg-stone-100 px-4 py-3 text-sm text-stone-700">
                  Este vehículo ya ha sido vendido
                </div>
              )}

              <p className="mt-6 text-3xl font-semibold text-orange-700">
                {price}
              </p>
              <p className="mt-1 text-sm text-stone-500">IVA incluido · Precio al contado</p>

              <div className="mt-8 space-y-3">
                {vehicle.is_available ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Solicitar información por WhatsApp sobre ${vehicle.brand} ${vehicle.model}`}
                    className="flex min-h-12 w-full items-center justify-center rounded-xl bg-orange-700 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-800"
                  >
                    Solicitar información
                  </a>
                ) : (
                  <p className="text-sm text-stone-500">
                    Este vehículo no está disponible para reserva
                  </p>
                )}
              </div>

              <ul className="mt-8 space-y-2.5 border-t border-stone-200 pt-8 text-sm text-stone-600">
                <li>Revisión mecánica de 150 puntos</li>
                <li>Historial de mantenimiento verificado</li>
                <li>Posibilidad de financiación</li>
                <li>Entrega en toda la península</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
