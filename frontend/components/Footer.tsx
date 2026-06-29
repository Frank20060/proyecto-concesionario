import Link from 'next/link';

import { siteConfig } from '@/lib/site.config';

/**
 * Footer — Pie de página con NAP completo para SEO local.
 *
 * Incluye:
 * - Nombre, dirección, teléfono, email (NAP)
 * - Enlace a Google Maps
 * - Horario de apertura
 * - Servicios
 * - Redes sociales
 * - Enlace WhatsApp
 * - Links legales placeholder
 */
export default function Footer() {
  const { name, address, phone, phoneDisplay, email, whatsapp, openingHoursDisplay } =
    siteConfig;

  const waMessage = encodeURIComponent(
    'Hola, he visto vuestra web de Grand Motors en Barcelona y me gustaría obtener más información.',
  );

  return (
    <footer
      className="mt-auto border-t border-stone-200"
      style={{ background: 'var(--color-brand)' }}
      aria-label="Pie de página"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Columna 1 — Marca + descripción */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label={`${name} — Inicio`}>
              <span className="font-serif text-xl font-bold text-white">{name}</span>
              <span className="mt-0.5 block text-[10px] uppercase tracking-[0.22em] text-slate-400">
                Concesionario · Barcelona
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Más de 20 años ayudando a nuestros clientes a encontrar el vehículo adecuado
              en Barcelona y toda Cataluña.
            </p>

            {/* Redes sociales */}
            <div className="mt-5 flex gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Grand Motors en Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-white/30 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Grand Motors en Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-white/30 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${whatsapp}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-white/30 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2 — Contacto y dirección NAP */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Contacto
            </p>

            {/* Dirección — marcado NAP */}
            <address
              className="mt-3 not-italic text-sm leading-relaxed text-slate-300"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <span itemProp="streetAddress">{address.street}</span>
              <br />
              <span itemProp="postalCode">{address.postalCode}</span>{' '}
              <span itemProp="addressLocality">{address.city}</span>
              <br />
              <span itemProp="addressCountry">{address.countryName}</span>
            </address>

            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs transition-colors hover:text-white"
              style={{ color: 'var(--color-accent)' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-3 w-3"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.399 2.291-3.53 2.291-6.097C13 3.735 10.765 1.5 8 1.5S3 3.735 3 6.5c0 2.568 1.19 4.699 2.291 6.097a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                  clipRule="evenodd"
                />
              </svg>
              Ver en Google Maps
            </a>

            <div className="mt-4 space-y-1.5">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-3.5 w-3.5 text-slate-400"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.245 3.6a1.5 1.5 0 0 1 1.453-1.1h.894a1.5 1.5 0 0 1 1.461 1.178l.5 2.5a1.5 1.5 0 0 1-1.025 1.74l-.617.184a.96.96 0 0 0-.596.782 5.996 5.996 0 0 0 4.8 4.8c.372.04.734-.18.782-.596l.184-.617a1.5 1.5 0 0 1 1.74-1.025l2.5.5A1.5 1.5 0 0 1 14.5 13.098v.905a1.497 1.497 0 0 1-1.5 1.497C6.271 15.5.5 9.729.5 3.002A1.497 1.497 0 0 1 1.245 3.6Z"
                    clipRule="evenodd"
                  />
                </svg>
                {phoneDisplay}
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-3.5 w-3.5 text-slate-400"
                  aria-hidden="true"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                {email}
              </a>
            </div>
          </div>

          {/* Columna 3 — Horario */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Horario
            </p>
            <ul className="mt-3 space-y-2">
              {openingHoursDisplay.map((h) => (
                <li key={h.days} className="flex justify-between gap-4 text-sm">
                  <span className="text-slate-400">{h.days}</span>
                  <span className="text-slate-300">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4 — Servicios + Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Servicios
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Venta de vehículos de ocasión</li>
              <li>Financiación a medida</li>
              <li>Garantía mecánica 12 meses</li>
              <li>Prueba de conducción</li>
              <li>Tasación de vehículos</li>
            </ul>

            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Legal
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Política de privacidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Aviso legal
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Política de cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {name}. Todos los derechos reservados.
          {' · '}
          Concesionario de vehículos de ocasión en Barcelona, {siteConfig.region}.
        </div>
      </div>
    </footer>
  );
}
