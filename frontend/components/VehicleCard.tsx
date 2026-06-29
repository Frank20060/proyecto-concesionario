import Image from 'next/image';
import Link from 'next/link';

import { getVehicleImageUrl } from '@/lib/images';
import { formatKm, formatPrice } from '@/lib/format';
import { vehicleUrl } from '@/lib/utils';
import type { Vehicle } from '@/types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
  /** Si es true, la imagen se precarga (solo para el primer card del viewport) */
  priority?: boolean;
}

export default function VehicleCard({ vehicle, priority = false }: VehicleCardProps) {
  const imageUrl = getVehicleImageUrl(vehicle);
  const href = vehicleUrl(vehicle.id);

  return (
    <Link
      href={href}
      className="group flex flex-col bg-white transition-all duration-200 hover:-translate-y-0.5 shadow-card hover:shadow-card-hover"
      style={{
        borderRadius: 'var(--radius-card)',
        border: '1px solid #e5e7eb',
      }}
      aria-label={`Ver ficha de ${vehicle.brand} ${vehicle.model} ${vehicle.year} en Barcelona`}
    >
      {/* Imagen */}
      <div
        className="relative aspect-[4/3] overflow-hidden bg-stone-100"
        style={{ borderRadius: 'var(--radius-card) var(--radius-card) 0 0' }}
      >
        {/* Badge vendido */}
        {!vehicle.is_available && (
          <span
            className="absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white"
            style={{ background: 'var(--color-brand)' }}
          >
            Vendido
          </span>
        )}

        {/* Badge disponible */}
        {vehicle.is_available && (
          <span
            className="absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
            style={{ background: 'var(--color-accent)' }}
          >
            Disponible
          </span>
        )}

        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${vehicle.brand} ${vehicle.model} de ocasión en Barcelona`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YxZjVmOSIvPjwvc3ZnPg=="
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-stone-100">
            <span className="font-serif text-5xl font-light text-stone-300">
              {vehicle.brand.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-5">
        {/* Marca */}
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
          {vehicle.brand}
        </p>

        {/* Modelo */}
        <h2 className="mt-1 font-serif text-lg font-semibold text-stone-900 group-hover:underline decoration-[var(--color-accent)] underline-offset-2">
          {vehicle.model}
        </h2>

        {/* Badges: año y km */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-md bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600">
            {vehicle.year}
          </span>
          <span className="inline-flex items-center rounded-md bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600">
            {formatKm(vehicle.km)}
          </span>
        </div>

        {/* Descripción */}
        {vehicle.description && (
          <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-stone-500">
            {vehicle.description}
          </p>
        )}

        {/* Precio + CTA */}
        <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4">
          <p
            className="text-xl font-bold"
            style={{ color: 'var(--color-brand)' }}
          >
            {formatPrice(vehicle.price)}
          </p>
          <span
            className="text-xs font-semibold uppercase tracking-wider transition-colors group-hover:underline"
            style={{ color: 'var(--color-accent)' }}
          >
            Ver ficha →
          </span>
        </div>
      </div>
    </Link>
  );
}
