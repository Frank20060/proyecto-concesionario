'use client';

import Link from 'next/link';
import { useState } from 'react';

import { siteConfig } from '@/lib/site.config';

/**
 * Header — Cabecera principal del sitio.
 *
 * Incluye:
 * - Barra top con teléfono y ubicación Barcelona
 * - Logo + tagline con font-serif (sin inline style)
 * - Nav principal con aria-label
 * - Menú mobile accesible (aria-expanded, aria-controls)
 */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* ── Barra top ──────────────────────────────────────────── */}
      <div
        className="border-b border-white/10 py-1.5 text-xs text-white"
        style={{ background: 'var(--color-brand)' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-3 w-3 opacity-70"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.399 2.291-3.53 2.291-6.097C13 3.735 10.765 1.5 8 1.5S3 3.735 3 6.5c0 2.568 1.19 4.699 2.291 6.097a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="opacity-80">{siteConfig.city}, {siteConfig.region}</span>
          </span>
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100"
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
                d="M1.245 3.6a1.5 1.5 0 0 1 1.453-1.1h.894a1.5 1.5 0 0 1 1.461 1.178l.5 2.5a1.5 1.5 0 0 1-1.025 1.74l-.617.184a.96.96 0 0 0-.596.782 5.996 5.996 0 0 0 4.8 4.8c.372.04.734-.18.782-.596l.184-.617a1.5 1.5 0 0 1 1.74-1.025l2.5.5A1.5 1.5 0 0 1 14.5 13.098v.905a1.497 1.497 0 0 1-1.5 1.497C6.271 15.5.5 9.729.5 3.002A1.497 1.497 0 0 1 1.245 3.6Z"
                clipRule="evenodd"
              />
            </svg>
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>

      {/* ── Barra principal ────────────────────────────────────── */}
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex flex-col" aria-label={`${siteConfig.name} — Inicio`}>
            <span className="font-serif text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
              {siteConfig.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-stone-400">
              Concesionario · Barcelona
            </span>
          </Link>

          {/* Nav desktop */}
          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-6 md:flex"
          >
            <Link
              href="/catalogo"
              className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
            >
              Catálogo
            </Link>
            <Link
              href="/sobre-nosotros"
              className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
            >
              Sobre nosotros
            </Link>
            <Link
              href="/preguntas-frecuentes"
              className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
            >
              Preguntas frecuentes
            </Link>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
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
              Contactar
            </a>
          </nav>

          {/* Hamburger mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 text-stone-600 transition-colors hover:bg-stone-50 md:hidden"
          >
            {mobileOpen ? (
              /* X */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Hamburger */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Menú mobile ────────────────────────────────────────── */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Menú móvil"
          className="border-b border-stone-200 bg-white md:hidden"
        >
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-3 sm:px-6">
            <Link
              href="/catalogo"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
            >
              Catálogo
            </Link>
            <Link
              href="/sobre-nosotros"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
            >
              Sobre nosotros
            </Link>
            <Link
              href="/preguntas-frecuentes"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
            >
              Preguntas frecuentes
            </Link>
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold"
              style={{ color: 'var(--color-accent)' }}
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
        </nav>
      )}
    </header>
  );
}
