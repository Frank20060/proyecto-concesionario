import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import VehicleGallery from '@/components/VehicleGallery';
import WhatsAppButton from '@/components/WhatsAppButton';
import { StructuredData } from '@/components/StructuredData';
import { getVehicle } from '@/lib/api/vehicles';
import { formatDate, formatKm, formatPrice } from '@/lib/format';
import { siteConfig } from '@/lib/site.config';

interface VehicleDetailPageProps {
  params: Promise<{ id: string; slug?: string }>;
}

/* ── Metadata dinámica ──────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: VehicleDetailPageProps): Promise<Metadata> {
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
  const description = `${vehicle.brand} ${vehicle.model} ${vehicle.year} en venta en Barcelona. ${formatKm(vehicle.km)} · Garantía 12 meses · Revisión 150 puntos · IVA incluido. ${vehicle.description?.slice(0, 100) ?? ''}`;

  const ogImage = vehicle.images[0]
    ? [{ url: vehicle.images[0], width: 1200, height: 630, alt: `${vehicle.brand} ${vehicle.model} ocasión en Barcelona` }]
    : [{ url: `${siteConfig.url}/og-default.jpg`, width: 1200, height: 630, alt: `${siteConfig.name} Barcelona` }];

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      url: `${siteConfig.url}/vehicles/${vehicle.id}`,
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
      canonical: `${siteConfig.url}/vehicles/${vehicle.id}`,
    },
  };
}

/* ── Componente de página ───────────────────────────────────────────── */
export default async function VehicleDetailPage({
  params,
}: VehicleDetailPageProps) {
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

  // Número simulado de personas interesadas (generado server-side, sin backend)
  const interestedCount = 2 + (vehicleId % 5);

  const waMessage = encodeURIComponent(
    `Hola, he visto el ${vehicle.brand} ${vehicle.model} ${vehicle.year} (${price}) en vuestra web y me gustaría más información. ¿Está disponible?`,
  );

  const specs = [
    { label: 'Marca', value: vehicle.brand },
    { label: 'Modelo', value: vehicle.model },
    { label: 'Año', value: String(vehicle.year) },
    { label: 'Kilometraje', value: formatKm(vehicle.km) },
    { label: 'Estado', value: vehicle.is_available ? 'Disponible' : 'Vendido' },
    { label: 'Publicado', value: formatDate(vehicle.created_at) },
  ];

  return (
    <div className="bg-white">
      {/* ── Breadcrumb semántico ─────────────────────────────── */}
      <div className="border-b border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav aria-label="Miga de pan">
            <ol className="flex items-center gap-1.5 text-sm text-stone-500">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-stone-900"
                >
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true" className="text-stone-300">
                /
              </li>
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-stone-900"
                >
                  Vehículos
                </Link>
              </li>
              <li aria-hidden="true" className="text-stone-300">
                /
              </li>
              <li
                className="font-medium text-stone-900"
                aria-current="page"
              >
                {vehicle.brand} {vehicle.model}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">

          {/* ── Columna izquierda: galería + descripción + ficha ─ */}
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
              <dl className="mt-4 overflow-hidden rounded-xl border border-stone-200">
                {specs.map((item, i) => (
                  <div
                    key={item.label}
                    className={`grid grid-cols-2 px-4 py-3.5 sm:px-5 ${i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}`}
                  >
                    <dt className="text-sm text-stone-500">{item.label}</dt>
                    <dd className="text-sm font-semibold text-stone-900">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* ── Columna derecha: panel de compra sticky ─────────── */}
          <div className="lg:col-span-2">
            <div
              className="sticky top-[6.5rem] z-40 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md"
              style={{ boxShadow: 'var(--shadow-card-hover)' }}
            >
              {/* Cabecera panel */}
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                  {vehicle.brand}
                </p>

                {/* H1 de la página */}
                <h1 className="mt-1 font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
                  {vehicle.brand} {vehicle.model}{' '}
                  <span className="text-stone-500">{vehicle.year}</span>
                </h1>
                <p className="mt-0.5 text-sm text-stone-500">
                  Ocasión en Barcelona
                </p>

                {/* Badge vendido */}
                {!vehicle.is_available && (
                  <div className="mt-4 rounded-lg bg-stone-100 px-4 py-3 text-sm font-medium text-stone-700">
                    Este vehículo ya ha sido vendido
                  </div>
                )}

                {/* Precio */}
                <div className="mt-5">
                  <p
                    className="text-3xl font-bold sm:text-4xl"
                    style={{ color: 'var(--color-brand)' }}
                  >
                    {price}
                  </p>
                  <p className="mt-1 text-xs text-stone-400">
                    IVA incluido · Precio al contado
                  </p>
                </div>

                {/* Señal de escasez */}
                {vehicle.is_available && (
                  <div
                    className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium"
                    style={{
                      background: 'rgba(217,119,6,0.08)',
                      color: 'var(--color-accent)',
                    }}
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

              {/* CTAs */}
              {vehicle.is_available && (
                <div className="space-y-3 border-t border-stone-100 bg-stone-50 px-6 py-5 sm:px-8">
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                    style={{ background: 'var(--color-accent)' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-8.284 0-15-6.716-15-15V3.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Llamar para reservar
                  </a>

                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-stone-200 bg-white py-3.5 text-sm font-bold text-stone-700 transition-colors hover:border-stone-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden="true"
                      style={{ color: '#25D366' }}
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    Consultar por WhatsApp
                  </a>

                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-3 text-sm font-medium text-stone-600 transition-colors hover:border-stone-300 hover:text-stone-900"
                  >
                    Solicitar prueba de conducción
                  </a>
                </div>
              )}

              {/* Garantías incluidas */}
              <ul className="space-y-2 border-t border-stone-100 px-6 py-5 text-sm text-stone-600 sm:px-8">
                {[
                  'Revisión mecánica de 150 puntos',
                  'Garantía 12 meses incluida',
                  'Historial de mantenimiento verificado',
                  'Financiación desde 0% TAE',
                  'Entrega en Barcelona y área metropolitana',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 shrink-0"
                      style={{ color: 'var(--color-accent)' }}
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Car + Offer */}
      <StructuredData type="vehicle" vehicle={vehicle} price={price} />

      {/* Botón flotante WhatsApp con mensaje del vehículo */}
      <WhatsAppButton
        message={`Hola, he visto el ${vehicle.brand} ${vehicle.model} ${vehicle.year} (${price}) en vuestra web y me gustaría más información. ¿Está disponible?`}
      />
    </div>
  );
}
