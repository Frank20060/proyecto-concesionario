import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Grand Motors | Vehículos de ocasión y seminuevos',
  description: 'Concesionario de confianza. Vehículos revisados, garantía y financiación.',
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
