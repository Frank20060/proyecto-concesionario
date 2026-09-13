import Link from 'next/link';

import ThemeToggle from '@/components/ThemeToggle';
import { buildWhatsAppContactUrl } from '@/lib/whatsapp';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1e2024] text-white shadow-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex flex-col">
          <span
            className="font-serif text-xl font-semibold tracking-tight text-white sm:text-2xl"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Grand Motors
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-stone-400">
            Concesionario oficial
          </span>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/vehicles"
            className="text-sm font-semibold text-stone-300 transition-colors hover:text-white"
          >
            Catálogo
          </Link>
          <Link
            href="/preguntas-frecuentes"
            className="text-sm font-medium text-stone-300 transition-colors hover:text-white"
          >
            FAQ
          </Link>
          <Link
            href="/sobre-nosotros"
            className="hidden text-sm font-medium text-stone-300 transition-colors hover:text-white md:block"
          >
            Sobre nosotros
          </Link>
          <ThemeToggle />
          <a
            href={buildWhatsAppContactUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar con Grand Motors por WhatsApp"
            className="rounded-lg bg-orange-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-800 sm:px-5"
          >
            Contáctanos
          </a>
        </nav>
      </div>
    </header>
  );
}
