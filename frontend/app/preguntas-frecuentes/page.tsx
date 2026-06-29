import type { Metadata } from 'next';

import FaqAccordion from '@/components/FaqAccordion';
import { StructuredData } from '@/components/StructuredData';

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
    <div className="bg-stone-50 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-stone-400">
            Soporte al cliente
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
            Preguntas Frecuentes
          </h1>
          <p className="mt-4 text-lg text-stone-600">
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
              href="tel:+34612345678"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-brand)' }}
            >
              Llamar ahora
            </a>
            <a
              href="https://wa.me/34612345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-stone-200 bg-white px-6 py-3 text-sm font-bold text-stone-700 transition-colors hover:border-stone-300"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      <StructuredData type="faq" data={schemaData} />
    </div>
  );
}
