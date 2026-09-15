'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

import ThemeToggle from '@/components/ThemeToggle';
import { buildWhatsAppContactUrl } from '@/lib/whatsapp';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Cierra el menú al cambiar el tamaño de pantalla a escritorio
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bloquea el scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { href: '/vehicles', label: 'Catálogo', bold: true },
    { href: '/preguntas-frecuentes', label: 'FAQ', bold: false },
    { href: '/sobre-nosotros', label: 'Sobre nosotros', bold: false },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1e2024] text-white shadow-lg">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex flex-col" onClick={() => setIsOpen(false)}>
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

          {/* Nav escritorio */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors hover:text-white ${
                  link.bold ? 'font-semibold text-stone-300' : 'font-medium text-stone-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
            <a
              href={buildWhatsAppContactUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar con Grand Motors por WhatsApp"
              className="rounded-lg bg-orange-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-800"
            >
              Contáctanos
            </a>
          </nav>

          {/* Controles móvil */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-stone-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {isOpen ? (
                /* X icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                /* Hamburger icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menú desplegable móvil */}
      <div
        className={`fixed inset-x-0 top-20 z-40 md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Panel */}
        <nav className="relative border-b border-white/10 bg-[#1e2024] px-4 pb-6 pt-4 shadow-2xl">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-stone-300 transition-colors hover:bg-white/8 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-white/10 pt-4">
            <a
              href={buildWhatsAppContactUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              aria-label="Contactar con Grand Motors por WhatsApp"
              className="flex w-full items-center justify-center rounded-lg bg-orange-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-800"
            >
              Contáctanos por WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
