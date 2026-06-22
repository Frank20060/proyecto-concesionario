'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useTransition } from 'react';

interface VehicleFiltersProps {
  brands: string[];
  initialBrand?: string;
  initialQ?: string;
  initialStatus?: 'available' | 'sold';
}

export default function VehicleFilters({
  brands,
  initialBrand = '',
  initialQ = '',
  initialStatus = 'available',
}: VehicleFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [q, setQ] = useState(initialQ);

  useEffect(() => {
    setQ(initialQ);
  }, [initialQ]);

  const applyFilters = useCallback(
    (updates: {
      brand?: string;
      q?: string;
      status?: 'available' | 'sold';
    }) => {
      const params = new URLSearchParams(searchParams.toString());

      const brand = updates.brand !== undefined ? updates.brand : initialBrand;
      const query = updates.q !== undefined ? updates.q : initialQ;
      const status =
        updates.status !== undefined ? updates.status : initialStatus;

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

      if (status === 'sold') {
        params.set('status', 'sold');
      } else {
        params.delete('status');
      }

      const queryString = params.toString();
      startTransition(() => {
        router.push(queryString ? `/?${queryString}` : '/');
      });
    },
    [router, searchParams, initialBrand, initialQ, initialStatus],
  );

  const hasActiveFilters =
    Boolean(initialBrand) ||
    Boolean(initialQ) ||
    initialStatus === 'sold';

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    applyFilters({ q });
  }

  return (
    <div
      className={`border border-stone-200 bg-stone-50 p-4 sm:p-5 ${isPending ? 'opacity-70' : ''}`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
          <div className="min-w-[180px]">
            <label
              htmlFor="filter-brand"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-stone-500"
            >
              Marca
            </label>
            <select
              id="filter-brand"
              value={initialBrand}
              onChange={(event) =>
                applyFilters({ brand: event.target.value })
              }
              className="w-full border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
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
              className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-stone-500"
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
                className="min-w-0 flex-1 border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none"
              />
              <button
                type="submit"
                className="border border-stone-900 bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>

        <div>
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-stone-500">
            Estado
          </span>
          <div className="inline-flex border border-stone-300 bg-white">
            <button
              type="button"
              onClick={() => applyFilters({ status: 'available' })}
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                initialStatus === 'available'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              En venta
            </button>
            <button
              type="button"
              onClick={() => applyFilters({ status: 'sold' })}
              className={`border-l border-stone-300 px-4 py-2.5 text-sm font-medium transition-colors ${
                initialStatus === 'sold'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Vendidos
            </button>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 border-t border-stone-200 pt-4">
          <button
            type="button"
            onClick={() => {
              setQ('');
              applyFilters({ brand: '', q: '', status: 'available' });
            }}
            className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
