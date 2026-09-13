import { Suspense } from 'react';

import VehicleFilters from '@/components/VehicleFilters';
import VehicleGrid from '@/components/VehicleGrid';
import DecorativeOrbits from '@/components/DecorativeOrbits';
import {
  getVehicleBrands,
  getVehicles,
  type VehicleListFilters,
} from '@/lib/api/vehicles';
import type { Vehicle } from '@/types/vehicle';

interface HomeProps {
  searchParams: Promise<{
    brand?: string;
    q?: string;
  }>;
}

function parseFilters(params: {
  brand?: string;
  q?: string;
}): VehicleListFilters {
  return {
    brand: params.brand?.trim() || undefined,
    q: params.q?.trim() || undefined,
    status: 'available',
  };
}

function FiltersFallback() {
  return (
    <div className="border border-stone-200 bg-stone-50 p-4 sm:p-5">
      <p className="text-sm text-stone-500">Cargando filtros…</p>
    </div>
  );
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const filters = parseFilters(params);

  let vehicles: Vehicle[] = [];
  let brands: string[] = [];
  let error: string | null = null;

  try {
    [vehicles, brands] = await Promise.all([
      getVehicles(filters),
      getVehicleBrands(),
    ]);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Error al cargar los vehículos';
  }

  const resultLabel =
    vehicles.length === 1
      ? '1 vehículo encontrado'
      : `${vehicles.length} vehículos encontrados`;

  return (
    <>
      <section className="relative overflow-hidden bg-[#1e2024] text-white">
        <DecorativeOrbits />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-1/4 h-1 w-48 bg-orange-600" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-400">
              Vehículos en stock
            </p>
            <h1
              className="mt-3 font-serif text-4xl font-semibold leading-tight text-white sm:text-6xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Encuentre su próximo vehículo
            </h1>
            <p className="mt-5 text-base leading-relaxed text-stone-300 sm:text-lg">
              Selección de automóviles revisados por nuestros técnicos.
              Transparencia en precio, historial y condiciones de venta.
            </p>
          </div>

          {!error && vehicles.length > 0 && (
            <div className="stats-panel mt-10 flex divide-x rounded-2xl border bg-white/5 backdrop-blur-sm">
              <div className="flex-1 px-4 py-5 sm:px-6">
                <p className="text-2xl font-semibold text-orange-400">
                  {vehicles.length}
                </p>
                <p className="mt-0.5 text-sm text-stone-400">Vehículos en venta</p>
              </div>
              <div className="flex-1 px-4 py-5 sm:px-6">
                <p className="text-2xl font-semibold text-orange-400">12</p>
                <p className="mt-0.5 text-sm text-stone-400">Meses de garantía</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#30343b] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex items-baseline justify-between border-b border-stone-200 pb-4">
          <h2 id="catalogo" className="text-xl font-semibold text-stone-900">
            Catálogo de vehículos
          </h2>
          {!error && (
            <p className="text-sm text-stone-500">{resultLabel}</p>
          )}
        </div>

        <div className="mb-8">
          <Suspense fallback={<FiltersFallback />}>
            <VehicleFilters
              brands={brands}
              initialBrand={filters.brand ?? ''}
              initialQ={filters.q ?? ''}
            />
          </Suspense>
        </div>

        {error ? (
          <div className="border border-red-200 bg-red-50 px-6 py-8 text-center">
            <p className="font-medium text-red-800">
              No se pudo cargar el catálogo
            </p>
            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="border border-stone-200 bg-stone-50 px-6 py-16 text-center">
            <p className="font-medium text-stone-700">
              No hay vehículos en venta con estos filtros
            </p>
            <p className="mt-2 text-sm text-stone-500">
              Prueba a cambiar la marca, la búsqueda o el estado del vehículo
            </p>
          </div>
        ) : (
          <VehicleGrid vehicles={vehicles} />
        )}
        </div>
      </section>
    </>
  );
}
