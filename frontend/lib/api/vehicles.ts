import { API_BASE_URL } from '@/lib/config';
import type { Vehicle } from '@/types/vehicle';

export interface VehicleListFilters {
  brand?: string;
  q?: string;
  status?: 'available' | 'sold';
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

function buildQueryString(filters?: VehicleListFilters): string {
  if (!filters) {
    return '';
  }

  const params = new URLSearchParams();

  if (filters.status === 'sold') {
    params.set('status', 'sold');
  }

  if (filters.brand) {
    params.set('brand', filters.brand);
  }

  if (filters.q) {
    params.set('q', filters.q);
  }

  const query = params.toString();
  return query ? `?${query}` : '';
}

export async function getVehicles(
  filters?: VehicleListFilters,
): Promise<Vehicle[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/vehicles/${buildQueryString(filters)}`,
    { cache: 'no-store' },
  );
  return handleResponse<Vehicle[]>(response);
}

export async function getVehicleBrands(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/api/vehicles/brands/`, {
    cache: 'no-store',
  });
  return handleResponse<string[]>(response);
}

export async function getVehicle(id: number): Promise<Vehicle> {
  const response = await fetch(`${API_BASE_URL}/api/vehicles/${id}/`, {
    cache: 'no-store',
  });
  return handleResponse<Vehicle>(response);
}
