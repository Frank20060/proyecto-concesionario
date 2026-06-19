export function formatPrice(price: string | number): string {
  const value = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatKm(km: number): string {
  return new Intl.NumberFormat('es-ES').format(km) + ' km';
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}
