import { siteConfig } from '@/lib/site.config';
import { vehicleUrl } from '@/lib/utils';
import type { Vehicle } from '@/types/vehicle';

interface OrganizationProps {
  type: 'organization';
}

interface VehicleProps {
  type: 'vehicle';
  vehicle: Vehicle;
  price: string;
}

interface FaqProps {
  type: 'faq';
  data: { q: string; a: string }[];
}

interface AboutProps {
  type: 'about';
}

type StructuredDataProps = OrganizationProps | VehicleProps | FaqProps | AboutProps;

/**
 * Renderiza JSON-LD estructurado en un <script> server-side.
 *
 * - type="organization": AutoDealer + LocalBusiness (usado en layout global)
 * - type="vehicle": Car + Offer (usado en ficha de vehículo)
 * - type="faq": FAQPage (usado en página de preguntas frecuentes)
 * - type="about": AboutPage (usado en página sobre nosotros)
 */
export function StructuredData(props: StructuredDataProps) {
  let jsonLd;

  if (props.type === 'organization') {
    jsonLd = buildOrganizationSchema();
  } else if (props.type === 'vehicle') {
    jsonLd = buildVehicleSchema(props.vehicle);
  } else if (props.type === 'faq') {
    jsonLd = buildFAQSchema(props.data);
  } else if (props.type === 'about') {
    jsonLd = buildAboutSchema();
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ─── Schemas ──────────────────────────────────────────────────────────── */

function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['AutoDealer', 'LocalBusiness'],
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: siteConfig.address.street,
          postalCode: siteConfig.address.postalCode,
          addressLocality: siteConfig.address.city,
          addressRegion: siteConfig.address.province,
          addressCountry: siteConfig.address.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
            ],
            opens: '09:30',
            closes: '20:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '10:00',
            closes: '14:00',
          },
        ],
        areaServed: [
          { '@type': 'City', name: 'Barcelona' },
          { '@type': 'AdministrativeArea', name: 'Área Metropolitana de Barcelona' },
          { '@type': 'AdministrativeArea', name: 'Cataluña' },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: siteConfig.aggregateRating.ratingValue,
          reviewCount: siteConfig.aggregateRating.reviewCount,
          bestRating: siteConfig.aggregateRating.bestRating,
          worstRating: siteConfig.aggregateRating.worstRating,
        },
        sameAs: [
          siteConfig.social.facebook,
          siteConfig.social.instagram,
          siteConfig.social.googleBusiness,
        ],
        currenciesAccepted: 'EUR',
        paymentAccepted: 'Cash, Credit Card, Bank Transfer',
        priceRange: '€€€',
        image: `${siteConfig.url}/og-default.jpg`,
      },
    ],
  };
}

function buildVehicleSchema(vehicle: Vehicle) {
  const availability = vehicle.is_available
    ? 'https://schema.org/InStock'
    : 'https://schema.org/SoldOut';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Car',
        name: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
        brand: {
          '@type': 'Brand',
          name: vehicle.brand,
        },
        model: vehicle.model,
        vehicleModelDate: String(vehicle.year),
        mileageFromOdometer: {
          '@type': 'QuantitativeValue',
          value: vehicle.km,
          unitCode: 'KMT',
        },
        description: vehicle.description,
        image: vehicle.images[0] ?? undefined,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'EUR',
          price: parseFloat(vehicle.price),
          availability,
          priceValidUntil: new Date(
            new Date().setMonth(new Date().getMonth() + 3),
          )
            .toISOString()
            .split('T')[0],
          seller: {
            '@type': 'AutoDealer',
            name: siteConfig.name,
            url: siteConfig.url,
          },
          itemCondition: 'https://schema.org/UsedCondition',
          areaServed: { '@type': 'City', name: 'Barcelona' },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: siteConfig.url,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
            item: `${siteConfig.url}${vehicleUrl(vehicle.id)}`,
          },
        ],
      },
    ],
  };
}

function buildFAQSchema(data: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

function buildAboutSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
    },
    url: `${siteConfig.url}/sobre-nosotros`,
    name: `Sobre nosotros | ${siteConfig.name}`,
    description: `Conoce la historia, visión y compromiso local de ${siteConfig.name} en Barcelona.`,
  };
}
