/**
 * utils.ts — Utilidades genéricas del frontend.
 */

/**
 * Convierte un texto en kebab-case ASCII (slug URL-friendly).
 * Ejemplo: "Toyota Corolla" → "toyota-corolla"
 */
export function toSlug(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // elimina tildes/diacríticos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')    // reemplaza no-alfanumérico con guión
    .replace(/^-+|-+$/g, '');        // elimina guiones al inicio/fin
}

/**
 * Construye la URL de un vehículo con solo ID.
 * Ejemplo: /catalogo/123
 */
export function vehicleUrl(id: number): string {
  return `/catalogo/${id}`;
}
