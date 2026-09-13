import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import VehicleGallery from '@/components/VehicleGallery';
import ScrollToTop from '@/components/ScrollToTop';
import { StructuredData } from '@/components/StructuredData';
import { getVehicle } from '@/lib/api/vehicles';
import { formatDate, formatKm, formatPrice } from '@/lib/format';
import { siteConfig } from '@/lib/site.config';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface VehicleDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: VehicleDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicleId = Number(id);
  if (Number.isNaN(vehicleId)) return {};

  let vehicle;
  try {
    vehicle = await getVehicle(vehicleId);
  } catch {
    return {};
  }

  const price = formatPrice(vehicle.price);
  const title = `${vehicle.brand} ${vehicle.model} ${vehicle.year} · ${price} · Barcelona`;
  const description = `${vehicle.brand} ${vehicle.model} ${vehicle.year} en venta en Barcelona. ${formatKm(vehicle.km)} · IVA incluido · Revisión completa. ${vehicle.description?.slice(0, 120) ?? ''}`;

  const ogImage = vehicle.images[0]
    ? [{ url: vehicle.images[0], width: 1200, height: 630, alt: `${vehicle.brand} ${vehicle.model} ocasión en Barcelona` }]
    : [{ url: `${siteConfig.url}/og-default.jpg`, width: 1200, height: 630, alt: `${siteConfig.name} Barcelona` }];

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      url: `${siteConfig.url}/catalogo/${vehicle.id}`,
      title,
      description,
      images: ogImage,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage[0].url],
    },
    alternates: {
      canonical: `${siteConfig.url}/catalogo/${vehicle.id}`,
    },
  };
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

  const price = formatPrice(vehicle.price);
  const interestedCount = 2 + (vehicleId % 5);
  const whatsappUrl = buildWhatsAppUrl({
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    price,
  });

  const specs = [
    { label: 'Marca', value: vehicle.brand },
    { label: 'Modelo', value: vehicle.model },
    { label: 'Año', value: String(vehicle.year) },
    { label: 'Kilometraje', value: formatKm(vehicle.km) },
    { label: 'Estado', value: vehicle.is_available ? 'Disponible' : 'Vendido' },
    { label: 'Publicado', value: formatDate(vehicle.created_at) },
  ];

  return (
    <div className="vehicle-detail-page bg-[#30343b]">
      <ScrollToTop />
      <StructuredData type="vehicle" vehicle={vehicle} price={price} />
      <div className="vehicle-detail-bar border-b border-stone-200 bg-[#292d33]">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav aria-label="Miga de pan">
            <ol className="flex items-center gap-1.5 text-sm text-stone-500">
              <li>
                <Link href="/" className="transition-colors hover:text-stone-900">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true" className="text-stone-300">/</li>
              <li>
                <Link href="/catalogo" className="transition-colors hover:text-stone-900">
                  Catálogo
                </Link>
              </li>
              <li aria-hidden="true" className="text-stone-300">/</li>
              <li className="font-medium text-stone-900" aria-current="page">
                {vehicle.brand} {vehicle.model}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <VehicleGallery
              images={vehicle.images}
              alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
            />

            <div className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-400">
                Descripción del vehículo
              </h2>
              <p className="mt-3 text-base leading-relaxed text-stone-600">
                {vehicle.description}
              </p>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-400">
                Ficha técnica
              </h2>
              <dl className="vehicle-detail-table mt-4 overflow-hidden rounded-xl border border-stone-200 bg-[#292d33] shadow-sm">
                {specs.map((item, index) => (
                  <div
                    key={item.label}
                    className={`grid grid-cols-2 px-4 py-3.5 sm:px-5 ${index % 2 === 0 ? 'bg-[#292d33]' : 'bg-[#343941]'}`}
                  >
                    <dt className="text-sm text-stone-500">{item.label}</dt>
                    <dd className="text-sm font-semibold text-stone-900">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div
              className="vehicle-detail-surface sticky top-[7rem] z-40 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md"
              style={{ boxShadow: 'var(--shadow-card-hover)' }}
            >
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                  {vehicle.brand}
                </p>
                <h1 className="mt-1 font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
                  {vehicle.brand} {vehicle.model}{' '}
                  <span className="text-stone-500">{vehicle.year}</span>
                </h1>
                <p className="mt-0.5 text-sm text-stone-500">Ocasión en Barcelona</p>

                {!vehicle.is_available && (
                  <div className="mt-4 rounded-lg bg-stone-100 px-4 py-3 text-sm font-medium text-stone-700">
                    Este vehículo ya ha sido vendido
                  </div>
                )}

                <div className="mt-5">
                  <p className="text-3xl font-bold text-orange-700 sm:text-4xl">
                    {price}
                  </p>
                  <p className="mt-1 text-xs text-stone-400">IVA incluido · Precio al contado</p>
                </div>

                {vehicle.is_available && (
                  <div
                    className="mt-4 flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2 text-xs font-medium text-orange-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    >
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                      <path
                        fillRule="evenodd"
                        d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Stock limitado · {interestedCount} personas interesadas
                  </div>
                )}
              </div>

              {vehicle.is_available && (
                <div className="space-y-3 border-t border-stone-100 bg-stone-50 px-6 py-5 sm:px-8">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Solicitar información por WhatsApp sobre ${vehicle.brand} ${vehicle.model}`}
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-700 px-4 py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-800"
                  >
                    Solicitar información
                  </a>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
