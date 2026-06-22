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
      className="group flex flex-col border border-stone-200 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        {!vehicle.is_available && (
          <span className="absolute left-3 top-3 z-10 bg-stone-900 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">
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

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
          {vehicle.brand}
        </p>
        <h2
          className="mt-1 font-serif text-xl font-semibold text-stone-900 group-hover:underline"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
        >
          {vehicle.model}
        </h2>

        <div className="mt-3 flex gap-4 text-sm text-stone-500">
          <span>{vehicle.year}</span>
          <span>·</span>
          <span>{formatKm(vehicle.km)}</span>
        </div>

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-stone-500">
          {vehicle.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4">
          <p className="text-lg font-semibold text-stone-900">
            {formatPrice(vehicle.price)}
          </p>
          <span className="text-sm font-medium text-stone-600 group-hover:text-stone-900">
            Ver ficha →
          </span>
        </div>
      </div>
    </Link>
  );
}
