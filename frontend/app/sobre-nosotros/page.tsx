import type { Metadata } from 'next';
import Image from 'next/image';

import { StructuredData } from '@/components/StructuredData';
import { siteConfig } from '@/lib/site.config';

export const metadata: Metadata = {
  title: 'Conócenos | Historia y Visión de Grand Motors',
  description: 'Descubre la historia y los valores de Grand Motors. Más de 20 años ofreciendo vehículos de ocasión revisados y garantizados en Barcelona.',
};

export default function SobreNosotrosPage() {
  return (
    <div className="bg-white">
      {/* ── Hero corporativo ────────────────────────────────── */}
      <div className="relative bg-stone-900 py-24 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-stone-900/80 mix-blend-multiply" />
          <Image
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop"
            alt="Fachada del concesionario Grand Motors en Barcelona"
            fill
            className="object-cover object-center opacity-40 grayscale"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-stone-400">
            Nuestra historia
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Transparencia y confianza en cada kilómetro
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-300">
            En {siteConfig.name} trabajamos con un único objetivo: revolucionar la compra de vehículos de ocasión en Barcelona ofreciendo un servicio honesto y sin letra pequeña.
          </p>
        </div>
      </div>

      {/* ── Propuesta de valor ───────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              Nuestra Visión
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-stone-600">
              <p>
                El mercado de vehículos de ocasión ha estado tradicionalmente rodeado de incertidumbre. En Grand Motors nacimos hace más de 20 años con la firme intención de cambiar esta percepción.
              </p>
              <p>
                Creemos que la compra de un coche debe ser un momento emocionante, seguro y totalmente transparente. Por ello, apostamos por digitalizar el mercado, ofreciendo información clara, fotografías de alta calidad y un proceso de venta donde <strong>el cliente siempre es la prioridad</strong>.
              </p>
              <p>
                No vendemos coches, facilitamos movilidad de confianza. Cada vehículo de nuestro catálogo ha superado revisiones mecánicas de 150 puntos y se entrega con kilometraje certificado y garantía completa.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-auto">
            <Image
              src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop"
              alt="Mecánico inspeccionando un vehículo en el taller de Grand Motors"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* ── Compromiso Local ─────────────────────────────────── */}
      <div className="bg-stone-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="order-2 lg:order-1 relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/media/barcelona.png"
                alt="Espectacular vista aérea de Barcelona, nuestra ciudad"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-3xl font-bold text-stone-900">
                Compromiso Local en Barcelona
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-stone-600">
                Estamos profundamente arraigados en <strong>Barcelona y el área metropolitana</strong>. Conocemos las necesidades de movilidad urbana e interurbana de nuestra región y seleccionamos nuestro stock basándonos en los estándares de emisiones y eficiencia que exige nuestra ciudad.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Asesoramiento sobre etiquetas medioambientales (ZBE).',
                  'Servicio de entrega a domicilio gratuito en Barcelona.',
                  'Gestoría propia para un cambio de nombre ágil y local.',
                  'Red de talleres asociados en toda Cataluña.',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-stone-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="mt-1 h-5 w-5 shrink-0"
                      style={{ color: 'var(--color-brand)' }}
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <StructuredData type="about" />
    </div>
  );
}
