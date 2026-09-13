import type { Metadata } from 'next';

import FaqAccordion from '@/components/FaqAccordion';
import DecorativeOrbits from '@/components/DecorativeOrbits';
import { StructuredData } from '@/components/StructuredData';
import { buildWhatsAppContactUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | Grand Motors Barcelona',
  description: 'Resolvemos tus dudas sobre financiación, garantías, entrega a domicilio y reservas de vehículos de ocasión en Grand Motors.',
};

export default function FaqPage() {
  const faqs = [
    {
      id: 'garantia',
      question: '¿Qué garantía tienen los vehículos?',
      answer: (
        <p>
          Todos nuestros vehículos incluyen por ley una <strong>garantía mecánica obligatoria de 12 meses</strong>. Esta garantía cubre averías imprevistas de motor, caja de cambios y componentes principales. Antes de la entrega, cada vehículo pasa por una rigurosa revisión de 150 puntos en nuestro taller para asegurar su perfecto estado.
        </p>
      ),
      // Para JSON-LD (texto plano)
      plainAnswer: 'Todos nuestros vehículos incluyen por ley una garantía mecánica obligatoria de 12 meses. Esta garantía cubre averías imprevistas de motor, caja de cambios y componentes principales. Antes de la entrega, cada vehículo pasa por una rigurosa revisión de 150 puntos en nuestro taller.',
    },
    {
      id: 'financiacion',
      question: '¿Se puede financiar sin entrada?',
      answer: (
        <p>
          Sí, ofrecemos planes de financiación <strong>100% a medida sin necesidad de entrada inicial</strong>. Trabajamos con las principales entidades financieras para ofrecerte condiciones ventajosas, con opciones desde 0% TAE sujeto a aprobación. Puedes elegir plazos desde 24 hasta 120 meses.
        </p>
      ),
      plainAnswer: 'Sí, ofrecemos planes de financiación 100% a medida sin necesidad de entrada inicial. Trabajamos con las principales entidades financieras para ofrecerte condiciones ventajosas, con opciones desde 0% TAE sujeto a aprobación. Puedes elegir plazos desde 24 hasta 120 meses.',
    },
    {
      id: 'entrega',
      question: '¿Cómo funciona la entrega en Barcelona y área metropolitana?',
      answer: (
        <p>
          Si resides en Barcelona ciudad o en su área metropolitana, te ofrecemos un servicio de <strong>entrega a domicilio sin coste adicional</strong>. Una vez formalizada la compra, uno de nuestros especialistas te llevará el vehículo a tu casa u oficina y te explicará en detalle todas sus funcionalidades.
        </p>
      ),
      plainAnswer: 'Si resides en Barcelona ciudad o en su área metropolitana, te ofrecemos un servicio de entrega a domicilio sin coste adicional. Una vez formalizada la compra, uno de nuestros especialistas te llevará el vehículo a tu casa u oficina y te explicará en detalle todas sus funcionalidades.',
    },
    {
      id: 'reserva',
      question: '¿Puedo reservar un vehículo online?',
      answer: (
        <p>
          Por supuesto. Dado que nuestro stock rota rápidamente, puedes <strong>reservar cualquier vehículo bloqueándolo temporalmente</strong> mediante una pequeña fianza. Contáctanos por WhatsApp o teléfono, y te facilitaremos un enlace de pago seguro para hacer la reserva al instante.
        </p>
      ),
      plainAnswer: 'Por supuesto. Dado que nuestro stock rota rápidamente, puedes reservar cualquier vehículo bloqueándolo temporalmente mediante una pequeña fianza. Contáctanos por WhatsApp o teléfono, y te facilitaremos un enlace de pago seguro para hacer la reserva al instante.',
    },
  ];

  // Estructura de datos para Schema.org (texto plano)
  const schemaData = faqs.map((f) => ({
    q: f.question,
    a: f.plainAnswer,
  }));

  return (
    <div className="bg-[#30343b] py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="faq-hero relative overflow-hidden rounded-3xl bg-[#1e2024] px-6 py-12 text-center text-white sm:px-12">
          <DecorativeOrbits hideSmall />
          <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.24em] text-orange-400">
            Soporte al cliente
          </p>
          <h1 className="relative z-10 mt-3 font-serif text-3xl font-bold text-white sm:text-5xl">
            Preguntas Frecuentes
          </h1>
          <p className="relative z-10 mt-4 text-lg text-stone-300">
            Resolvemos las dudas más comunes sobre nuestro proceso de compra, garantías y financiación.
          </p>
        </div>

        <div className="mt-12">
          <FaqAccordion items={faqs} />
        </div>

        <div className="mt-16 rounded-2xl bg-white p-8 text-center shadow-sm border border-stone-200">
          <h2 className="font-serif text-xl font-semibold text-stone-900">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="mt-2 text-stone-600">
            Nuestro equipo está a tu disposición para ayudarte.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={buildWhatsAppContactUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar con Grand Motors por WhatsApp"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-800"
            >
              Contáctanos por WhatsApp
            </a>
          </div>
        </div>
      </div>

      <StructuredData type="faq" data={schemaData} />
    </div>
  );
}
