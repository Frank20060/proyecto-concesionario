import Image from 'next/image';
import Link from 'next/link';

import { getVehicleImageUrl } from '@/lib/images';
import { formatKm, formatPrice } from '@/lib/format';
import type { Vehicle } from '@/types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const imageUrl = getVehicleImageUrl(vehicle);

  return (
    <Link
      href={`/vehicles/${vehicle.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        {!vehicle.is_available && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-[#1e2024] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Vendido
          </span>
        )}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${vehicle.brand} ${vehicle.model}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-serif text-5xl font-light text-stone-300">
              {vehicle.brand.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
          {vehicle.brand}
        </p>
        <h2
          className="mt-1 font-serif text-xl font-semibold text-stone-900 transition-colors group-hover:text-orange-700"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
        >
          {vehicle.model}
        </h2>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-stone-600">
          <span className="vehicle-meta-chip rounded-md px-2.5 py-1">{vehicle.year}</span>
          <span className="vehicle-meta-chip rounded-md px-2.5 py-1">{formatKm(vehicle.km)}</span>
        </div>

        <p className="mt-4 line-clamp-2 flex-1 text-sm leading-relaxed text-stone-500">
          {vehicle.description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4">
          <p className="text-xl font-bold text-orange-700">
            {formatPrice(vehicle.price)}
          </p>
          <span className="text-sm font-semibold text-stone-500 transition-colors group-hover:text-orange-700">
            Ver ficha <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
