'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useTransition } from 'react';

interface VehicleFiltersProps {
  brands: string[];
  initialBrand?: string;
  initialQ?: string;
}

export default function VehicleFilters({
  brands,
  initialBrand = '',
  initialQ = '',
}: VehicleFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [prevInitialQ, setPrevInitialQ] = useState(initialQ);
  const [q, setQ] = useState(initialQ);

  if (prevInitialQ !== initialQ) {
    setPrevInitialQ(initialQ);
    setQ(initialQ);
  }

  const applyFilters = useCallback(
    (updates: {
      brand?: string;
      q?: string;
    }) => {
      const params = new URLSearchParams(searchParams.toString());

      const brand = updates.brand !== undefined ? updates.brand : initialBrand;
      const query = updates.q !== undefined ? updates.q : initialQ;

      if (brand) {
        params.set('brand', brand);
      } else {
        params.delete('brand');
      }

      if (query.trim()) {
        params.set('q', query.trim());
      } else {
        params.delete('q');
      }

      params.delete('status');

      const queryString = params.toString();
      startTransition(() => {
        router.push(queryString ? `/?${queryString}` : '/');
      });
    },
    [router, searchParams, initialBrand, initialQ],
  );

  const hasActiveFilters = Boolean(initialBrand) || Boolean(initialQ);

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    applyFilters({ q });
  }

  return (
    <div
      className={`rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5 ${isPending ? 'opacity-70' : ''}`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
          <div className="min-w-[180px]">
            <label
              htmlFor="filter-brand"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-stone-500"
            >
              Marca
            </label>
            <select
              id="filter-brand"
              value={initialBrand}
              onChange={(event) =>
                applyFilters({ brand: event.target.value })
              }
              className="w-full rounded-lg border border-stone-300 bg-stone-100 px-3 py-2.5 text-sm text-stone-100 transition-colors focus:border-orange-500 focus:bg-stone-50 focus:outline-none"
            >
              <option value="">Todas las marcas</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={handleSearchSubmit} className="min-w-[220px] flex-1">
            <label
              htmlFor="filter-q"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-stone-500"
            >
              Buscar
            </label>
            <div className="flex gap-2">
              <input
                id="filter-q"
                type="search"
                value={q}
                onChange={(event) => setQ(event.target.value)}
                placeholder="Marca, modelo o ambos…"
                className="min-w-0 flex-1 rounded-lg border border-stone-300 bg-stone-100 px-3 py-2.5 text-sm text-stone-100 placeholder:text-stone-400 transition-colors focus:border-orange-500 focus:bg-stone-50 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-orange-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-800"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>

      </div>

      {hasActiveFilters && (
        <div className="mt-4 border-t border-stone-200 pt-4">
          <button
            type="button"
            onClick={() => {
              setQ('');
              applyFilters({ brand: '', q: '' });
            }}
            className="text-sm font-semibold text-orange-700 transition-colors hover:text-orange-900"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
