import { siteConfig } from '@/lib/site.config';

/**
 * UspSection — Bloque de Unique Selling Points antes del footer.
 *
 * 3 columnas: Por qué elegirnos, Prueba de conducción, Tasación.
 * Incluye valoración Google con estrellas y CTAs telefónicos.
 */

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1" aria-label={`Valoración ${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < fullStars;
        const half = !filled && hasHalf && i === fullStars;
        return (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="h-4 w-4"
            aria-hidden="true"
            style={{ color: filled || half ? '#f59e0b' : '#d1d5db' }}
          >
            <path
              fill="currentColor"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"
            />
          </svg>
        );
      })}
    </div>
  );
}

const usps = [
  {
    id: 'why-us',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
        />
      </svg>
    ),
    title: 'Por qué Grand Motors',
    items: [
      'Más de 20 años en el sector del automóvil en Barcelona',
      '+500 clientes satisfechos en Cataluña',
      'Equipo de mecánicos certificados',
      'Historial y ITV verificados en cada vehículo',
      'Precio sin sorpresas ni cargos ocultos',
    ],
  },
  {
    id: 'test-drive',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
        />
      </svg>
    ),
    title: 'Prueba de conducción',
    description:
      '¿Te gusta un coche pero quieres sentirlo antes de decidir? Concertamos tu prueba en Barcelona o alrededores sin compromiso.',
    cta: true,
  },
  {
    id: 'valuation',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
    title: 'Tasamos tu vehículo',
    description:
      '¿Quieres vender o hacer un cambio? Te damos una valoración justa y sin compromiso. Proceso transparente y rápido en nuestras instalaciones de Barcelona.',
    cta: true,
  },
];

export default function UspSection() {
  const { aggregateRating } = siteConfig;

  return (
    <section
      aria-labelledby="usp-heading"
      className="border-t border-stone-200 bg-gradient-to-b from-stone-50 to-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado con valoración */}
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
            Por qué elegirnos
          </p>
          <h2
            id="usp-heading"
            className="mt-3 font-serif text-3xl font-bold text-stone-900 sm:text-4xl"
          >
            El concesionario de confianza en Barcelona
          </h2>

          {/* Badge de valoración Google */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2">
            <StarRating rating={aggregateRating.ratingValue} />
            <span className="text-sm font-semibold text-amber-700">
              {aggregateRating.ratingValue}/5
            </span>
            <span className="text-sm text-stone-500">
              · {aggregateRating.reviewCount} valoraciones en Google
            </span>
          </div>
        </div>

        {/* Grid de USPs */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {usps.map((usp) => (
            <div
              key={usp.id}
              className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Icono */}
              <div
                className="inline-flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ background: 'rgba(217,119,6,0.1)', color: 'var(--color-accent)' }}
              >
                {usp.icon}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-stone-900">{usp.title}</h3>

              {/* Variante lista */}
              {'items' in usp && usp.items && (
                <ul className="mt-4 space-y-2.5">
                  {usp.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: 'var(--color-accent)' }}
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Variante descripción + CTA */}
              {'description' in usp && (
                <>
                  <p className="mt-4 text-sm leading-relaxed text-stone-600">
                    {usp.description}
                  </p>

                  {'cta' in usp && usp.cta && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={`tel:${siteConfig.phone}`}
                        className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: 'var(--color-accent)' }}
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
                        Llamar ahora
                      </a>
                      <a
                        href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hola, me gustaría obtener más información sobre vuestros servicios.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-400"
                      >
                        WhatsApp
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
