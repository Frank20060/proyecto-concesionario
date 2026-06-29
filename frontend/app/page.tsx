import Link from 'next/link';

import HeroSection from '@/components/HeroSection';
import TrustBar from '@/components/TrustBar';
import UspSection from '@/components/UspSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import VehicleGrid from '@/components/VehicleGrid';
import { getVehicles } from '@/lib/api/vehicles';
import type { Vehicle } from '@/types/vehicle';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let featuredVehicles: Vehicle[] = [];
  let error: string | null = null;

  try {
    // Fetch only available vehicles for the homepage
    const vehicles = await getVehicles({ status: 'available' });

    // Server-side shuffle (Fisher-Yates) to ensure 3 random vehicles
    // without hydration mismatches on the client.
    const shuffled = [...vehicles];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    featuredVehicles = shuffled.slice(0, 3);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Error al cargar los vehículos';
  }

  return (
    <>
      {/* ── Hero — H1 único de la página ──────────────────────── */}
      <HeroSection />

      {/* ── Barra de confianza ─────────────────────────────────── */}
      <TrustBar />

      {/* ── Vehículos Destacados ───────────────────────────────── */}
      <section
        id="destacados"
        aria-labelledby="destacados-heading"
        className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="mb-8 flex items-baseline justify-between border-b border-stone-200 pb-4">
          <h2
            id="destacados-heading"
            className="text-2xl font-bold text-stone-900"
            tabIndex={-1}
          >
            Vehículos de ocasión destacados en Barcelona
          </h2>
        </div>

        {/* Resultados */}
        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center">
            <p className="font-semibold text-red-800">
              No se pudo cargar el stock destacado
            </p>
            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>
        ) : featuredVehicles.length === 0 ? (
          <div className="rounded-xl border border-stone-200 bg-stone-50 px-6 py-16 text-center">
            <p className="font-semibold text-stone-700">
              No hay vehículos en venta en este momento
            </p>
          </div>
        ) : (
          <VehicleGrid vehicles={featuredVehicles} />
        )}

        {/* CTA a catálogo completo */}
        {!error && featuredVehicles.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-brand)' }}
            >
              Ver todo el catálogo en stock
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        )}
      </section>

      {/* ── USP / Por qué elegirnos ───────────────────────────── */}
      <div id="usp">
        <UspSection />
      </div>

      {/* ── Botón flotante WhatsApp ───────────────────────────── */}
      <WhatsAppButton />
    </>
  );
}
