'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';

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
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [q, setQ] = useState(initialQ);
  const catalogHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    setQ(initialQ);
  }, [initialQ]);

  // Referencia al H2 del catálogo para gestión de foco post-filtro
  useEffect(() => {
    catalogHeadingRef.current = document.querySelector<HTMLHeadingElement>('#catalog-heading');
  }, []);

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
        router.push(queryString ? `${pathname}?${queryString}` : pathname);
        // Mover foco al heading de resultados para anunciar cambio a lectores de pantalla
        requestAnimationFrame(() => {
          catalogHeadingRef.current?.focus();
        });
      });
    },
    [router, pathname, searchParams, initialBrand, initialQ, initialStatus],
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
      className={`rounded-xl border border-stone-200 bg-stone-50 p-4 sm:p-5 ${isPending ? 'opacity-60' : ''}`}
      aria-busy={isPending}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
          {/* Marca */}
          <div className="min-w-[180px]">
            <label
              htmlFor="filter-brand"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500"
            >
              Marca
            </label>
            <select
              id="filter-brand"
              value={initialBrand}
              onChange={(event) =>
                applyFilters({ brand: event.target.value })
              }
              disabled={isPending}
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 transition-colors focus:border-amber-500 focus:outline-none disabled:opacity-60"
            >
              <option value="">Todas las marcas</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Búsqueda */}
          <form onSubmit={handleSearchSubmit} className="min-w-[220px] flex-1">
            <label
              htmlFor="filter-q"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500"
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
                disabled={isPending}
                className="min-w-0 flex-1 rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isPending}
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ background: 'var(--color-brand)' }}
              >
                Buscar
              </button>
            </div>
          </form>
        </div>

        {/* Estado */}
        <div>
          <span
            id="status-filter-label"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-stone-500"
          >
            Estado
          </span>
          <div
            className="inline-flex overflow-hidden rounded-lg border border-stone-300 bg-white"
            role="group"
            aria-labelledby="status-filter-label"
          >
            <button
              type="button"
              onClick={() => applyFilters({ status: 'available' })}
              disabled={isPending}
              aria-pressed={initialStatus === 'available'}
              className={`px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60 ${
                initialStatus === 'available'
                  ? 'text-white'
                  : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
              }`}
              style={
                initialStatus === 'available'
                  ? { background: 'var(--color-brand)' }
                  : undefined
              }
            >
              En venta
            </button>
            <button
              type="button"
              onClick={() => applyFilters({ status: 'sold' })}
              disabled={isPending}
              aria-pressed={initialStatus === 'sold'}
              className={`border-l border-stone-300 px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60 ${
                initialStatus === 'sold'
                  ? 'text-white'
                  : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
              }`}
              style={
                initialStatus === 'sold'
                  ? { background: 'var(--color-brand)' }
                  : undefined
              }
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
            className="rounded text-sm font-medium text-stone-500 underline underline-offset-2 transition-colors hover:text-stone-900"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
