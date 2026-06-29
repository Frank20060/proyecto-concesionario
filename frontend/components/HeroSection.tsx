import Link from 'next/link';

import { siteConfig } from '@/lib/site.config';

/**
 * HeroSection — Bloque hero principal de la homepage.
 *
 * - H1 SEO: "Coches de ocasión en Barcelona"
 * - CTAs de conversión: Ver stock (ancla) + llamada telefónica
 * - Estadísticas inline
 * - Fondo degradado brand → oscuro con patrón geométrico sutil
 */
export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--color-brand) 0%, #0f172a 100%)' }}
      aria-labelledby="hero-heading"
    >
      {/* Patrón decorativo de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Gradiente overlay izquierda→derecha para legibilidad */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 10% 50%, rgba(217,119,6,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          {/* Label superior */}
          <p className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
            <span aria-hidden="true">📍</span>
            Concesionario en Barcelona
          </p>

          {/* H1 SEO */}
          <h1
            id="hero-heading"
            className="mt-5 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Coches de ocasión
            <br />
            <span style={{ color: 'var(--color-accent)' }}>en Barcelona</span>
          </h1>

          {/* Subtítulo con propuesta de valor */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Vehículos revisados con{' '}
            <strong className="text-white">garantía de 12 meses</strong>,
            revisión de{' '}
            <strong className="text-white">150 puntos</strong> y{' '}
            <strong className="text-white">financiación a medida</strong>.
            Entrega en toda el área metropolitana.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#catalogo"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg focus-visible:outline-none"
              style={{
                background: 'var(--color-accent)',
                boxShadow: '0 4px 14px rgba(217,119,6,0.4)',
              }}
            >
              Ver stock disponible
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 0 1 0-1.06L9.44 9.5 5.22 5.28a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-8.284 0-15-6.716-15-15V3.5Z"
                  clipRule="evenodd"
                />
              </svg>
              {siteConfig.phoneDisplay}
            </a>
          </div>

          {/* Estadísticas */}
          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
            {[
              { value: siteConfig.stats.vehiclesInStock, label: 'Vehículos en stock' },
              { value: siteConfig.stats.yearsExperience, label: 'Años de experiencia' },
              { value: siteConfig.stats.happyClients, label: 'Clientes satisfechos' },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-serif text-3xl font-bold sm:text-4xl"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
