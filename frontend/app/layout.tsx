import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { StructuredData } from '@/components/StructuredData';
import { siteConfig } from '@/lib/site.config';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} Barcelona | Coches de ocasión con garantía`,
    template: `%s | ${siteConfig.name} Barcelona`,
  },

  description: siteConfig.description,

  keywords: [
    'coches de ocasión Barcelona',
    'coches segunda mano Barcelona',
    'concesionario Barcelona',
    'vehículos seminuevos Cataluña',
    'comprar coche Barcelona garantía',
    'financiación coches Barcelona',
    'Grand Motors',
  ],

  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteConfig.url,
    siteName: `${siteConfig.name} Barcelona`,
    title: `${siteConfig.name} | Coches de ocasión en Barcelona`,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Concesionario de ocasión en Barcelona`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Coches de ocasión en Barcelona`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-default.jpg`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-stone-900">
        {/* Skip link — accesibilidad teclado */}
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>

        <Header />

        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>

        <Footer />

        {/* JSON-LD global: AutoDealer + LocalBusiness */}
        <StructuredData type="organization" />
      </body>
    </html>
  );
}
