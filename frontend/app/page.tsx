import { Suspense } from 'react';

import VehicleFilters from '@/components/VehicleFilters';
import VehicleGrid from '@/components/VehicleGrid';
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
    status?: string;
  }>;
}

function parseFilters(params: {
  brand?: string;
  q?: string;
  status?: string;
}): VehicleListFilters {
  return {
    brand: params.brand?.trim() || undefined,
    q: params.q?.trim() || undefined,
    status: params.status === 'sold' ? 'sold' : 'available',
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

  const isSoldView = filters.status === 'sold';
  const resultLabel =
    vehicles.length === 1
      ? '1 vehículo encontrado'
      : `${vehicles.length} vehículos encontrados`;

  return (
    <>
      <section className="border-b border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
              {isSoldView ? 'Histórico de ventas' : 'Vehículos en stock'}
            </p>
            <h1
              className="mt-3 font-serif text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Encuentre su próximo vehículo
            </h1>
            <p className="mt-5 text-base leading-relaxed text-stone-600 sm:text-lg">
              Selección de automóviles revisados por nuestros técnicos.
              Transparencia en precio, historial y condiciones de venta.
            </p>
          </div>

          {!error && vehicles.length > 0 && (
            <div className="mt-10 flex divide-x divide-stone-200 border border-stone-200 bg-white">
              <div className="flex-1 px-6 py-5">
                <p className="text-2xl font-semibold text-stone-900">
                  {vehicles.length}
                </p>
                <p className="mt-0.5 text-sm text-stone-500">
                  {isSoldView ? 'Vehículos vendidos' : 'Vehículos en venta'}
                </p>
              </div>
              <div className="flex-1 px-6 py-5">
                <p className="text-2xl font-semibold text-stone-900">
                  {brands.length}
                </p>
                <p className="mt-0.5 text-sm text-stone-500">Marcas en stock</p>
              </div>
              <div className="hidden flex-1 px-6 py-5 sm:block">
                <p className="text-2xl font-semibold text-stone-900">12</p>
                <p className="mt-0.5 text-sm text-stone-500">Meses de garantía</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-baseline justify-between border-b border-stone-200 pb-4">
          <h2 className="text-lg font-semibold text-stone-900">
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
              initialStatus={filters.status ?? 'available'}
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
              {isSoldView
                ? 'No hay vehículos vendidos con estos filtros'
                : 'No hay vehículos en venta con estos filtros'}
            </p>
            <p className="mt-2 text-sm text-stone-500">
              Prueba a cambiar la marca, la búsqueda o el estado del vehículo
            </p>
          </div>
        ) : (
          <VehicleGrid vehicles={vehicles} />
        )}
      </section>
    </>
  );
}
