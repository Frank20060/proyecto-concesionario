import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Catálogo de Coches de Ocasión | Grand Motors Barcelona',
  description: 'Busca y filtra nuestro catálogo completo de vehículos de ocasión revisados en Barcelona. Encuentra tu próximo coche con garantía.',
};

interface CatalogoProps {
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
    <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 sm:p-5">
      <p className="text-sm text-stone-500">Cargando filtros…</p>
    </div>
  );
}

export default async function CatalogoPage({ searchParams }: CatalogoProps) {
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

  const resultCount = vehicles.length;
  const resultLabel =
    resultCount === 1
      ? '1 vehículo encontrado'
      : `${resultCount} vehículos encontrados`;

  return (
    <div className="bg-[#30343b]">
      {/* ── Cabecera de página ───────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#1e2024] py-12 text-white sm:py-20">
        <DecorativeOrbits />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-400">
            Stock revisado
          </p>
          <h1 className="mt-3 font-serif text-3xl font-bold text-white sm:text-5xl">
            Catálogo de vehículos
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-300">
            Explora nuestra selección de coches de ocasión en Barcelona, todos ellos revisados minuciosamente y con garantía incluida.
          </p>
        </div>
      </div>

      {/* ── Catálogo ───────────────────────────────────────────── */}
      <section
        id="catalogo"
        aria-labelledby="catalog-heading"
        className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16"
      >
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2
            id="catalog-heading"
            className="text-xl font-bold text-stone-900"
            tabIndex={-1}
          >
            Vehículos en venta
          </h2>

          {/* Contador de resultados — aria-live para lectores de pantalla */}
          {!error && (
            <p
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="text-sm font-medium text-stone-500"
            >
              {resultLabel}
            </p>
          )}
        </div>

        {/* Filtros */}
        <div className="mb-8">
          <Suspense fallback={<FiltersFallback />}>
            <VehicleFilters
              brands={brands}
              initialBrand={filters.brand ?? ''}
              initialQ={filters.q ?? ''}
            />
          </Suspense>
        </div>

        {/* Resultados */}
        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center">
            <p className="font-semibold text-red-800">
              No se pudo cargar el catálogo
            </p>
            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="rounded-xl border border-stone-200 bg-stone-50 px-6 py-16 text-center">
            <p className="font-semibold text-stone-700">
              No hay vehículos en venta con estos filtros
            </p>
            <p className="mt-2 text-sm text-stone-500">
              Prueba a cambiar la marca, la búsqueda o el estado del vehículo
            </p>
          </div>
        ) : (
          <VehicleGrid vehicles={vehicles} />
        )}
      </section>
    </div>
  );
}
