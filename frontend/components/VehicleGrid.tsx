import VehicleCard from '@/components/VehicleCard';
import type { Vehicle } from '@/types/vehicle';

interface VehicleGridProps {
  vehicles: Vehicle[];
}

export default function VehicleGrid({ vehicles }: VehicleGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle, index) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          priority={index === 0}
        />
      ))}
    </div>
  );
}
