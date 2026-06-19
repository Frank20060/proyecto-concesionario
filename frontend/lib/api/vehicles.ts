import { API_BASE_URL } from '@/lib/config';
import type { Vehicle } from '@/types/vehicle';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function getVehicles(): Promise<Vehicle[]> {
  const response = await fetch(`${API_BASE_URL}/api/vehicles/`, {
    cache: 'no-store',
  });
  return handleResponse<Vehicle[]>(response);
}

export async function getVehicle(id: number): Promise<Vehicle> {
  const response = await fetch(`${API_BASE_URL}/api/vehicles/${id}/`, {
    cache: 'no-store',
  });
  return handleResponse<Vehicle>(response);
}
