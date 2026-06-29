/**
 * site.config.ts — Configuración central del negocio Grand Motors.
 *
 * Variables de entorno para producción:
 *   NEXT_PUBLIC_SITE_URL  → URL pública del sitio (ej. https://www.grandmotors.es)
 *   NEXT_PUBLIC_WHATSAPP  → Número WhatsApp sin + ni espacios (ej. 34612345678)
 *   NEXT_PUBLIC_PHONE     → Teléfono de contacto (ej. +34900000000)
 *   NEXT_PUBLIC_EMAIL     → Email de contacto
 */

export const siteConfig = {
  name: 'Grand Motors',
  tagline: 'Concesionario de vehículos de ocasión en Barcelona',
  description:
    'Grand Motors: coches de ocasión en Barcelona con garantía 12 meses, revisión de 150 puntos y financiación a medida. Más de 20 años al servicio de nuestros clientes en Cataluña.',

  /** URL pública (sin barra final) */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),

  city: 'Barcelona',
  region: 'Cataluña',

  /** NAP — Name, Address, Phone (crucial para SEO local) */
  address: {
    street: 'Carrer de la Diputació, 245',
    postalCode: '08007',
    city: 'Barcelona',
    province: 'Barcelona',
    country: 'ES',
    countryName: 'España',
  },

  phone: process.env.NEXT_PUBLIC_PHONE ?? '+34900000000',
  phoneDisplay: '900 000 000',

  /** Número WhatsApp sin el + (para el link wa.me/34...) */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '34900000000',

  email: process.env.NEXT_PUBLIC_EMAIL ?? 'info@grandmotors.es',

  /** Horario de apertura en formato Schema.org */
  openingHours: [
    'Mo-Fr 09:30-20:00',
    'Sa 10:00-14:00',
  ],

  /** Horario legible para humanos */
  openingHoursDisplay: [
    { days: 'Lunes – Viernes', hours: '9:30 – 20:00' },
    { days: 'Sábado', hours: '10:00 – 14:00' },
    { days: 'Domingo', hours: 'Cerrado' },
  ],

  /** Coordenadas geográficas (Barcelona centro, ajusta a la ubicación exacta) */
  geo: {
    latitude: 41.3874,
    longitude: 2.1686,
  },

  /** Enlace a Google Maps */
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Grand+Motors+Barcelona',

  /** Redes sociales y perfiles — rellena con URLs reales */
  social: {
    facebook: 'https://www.facebook.com/grandmotors.barcelona',
    instagram: 'https://www.instagram.com/grandmotors.barcelona',
    googleBusiness: 'https://g.page/grandmotors-barcelona',
  },

  /**
   * Valoración media — usa datos reales cuando los tengas.
   * Se inyecta en el JSON-LD de LocalBusiness como aggregateRating.
   */
  aggregateRating: {
    ratingValue: 4.8,
    reviewCount: 127,
    bestRating: 5,
    worstRating: 1,
  },

  /** Estadísticas del hero */
  stats: {
    vehiclesInStock: '+80',
    brands: '+15',
    yearsExperience: '20+',
    happyClients: '+500',
  },
};

export type SiteConfig = typeof siteConfig;
