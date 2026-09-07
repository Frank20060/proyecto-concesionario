import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import VehicleGallery from '@/components/VehicleGallery';
import { getVehicle } from '@/lib/api/vehicles';
import { formatDate, formatKm, formatPrice } from '@/lib/format';

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

  return (
    <div className="bg-white">
      <div className="border-b border-stone-200 bg-stone-50">
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

            <div className="mt-10">
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
              <dl className="mt-4 divide-y divide-stone-200 border border-stone-200">
                {specs.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-2 px-4 py-3.5 sm:px-5"
                  >
                    <dt className="text-sm text-stone-500">{item.label}</dt>
                    <dd className="text-sm font-medium text-stone-900">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-8 border border-stone-200 bg-white p-6 sm:p-8">
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

              <p className="mt-6 text-3xl font-semibold text-stone-900">
                {formatPrice(vehicle.price)}
              </p>
              <p className="mt-1 text-sm text-stone-500">IVA incluido · Precio al contado</p>

              <div className="mt-8 space-y-3">
                {vehicle.is_available ? (
                  <>
                    <button
                      type="button"
                      className="w-full bg-stone-900 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-stone-800"
                    >
                      Solicitar información
                    </button>
                    <button
                      type="button"
                      className="w-full border border-stone-300 bg-white px-6 py-3.5 text-sm font-medium text-stone-700 transition-colors hover:border-stone-900 hover:text-stone-900"
                    >
                      Solicitar prueba de conducción
                    </button>
                  </>
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
    </div>
  );
}
