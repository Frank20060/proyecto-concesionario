import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex flex-col">
          <span
            className="font-serif text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Grand Motors
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-stone-500">
            Concesionario oficial
          </span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
          >
            Vehículos en venta
          </Link>
          <a
            href="tel:+34900000000"
            className="hidden text-sm text-stone-600 transition-colors hover:text-stone-900 sm:block"
          >
            900 000 000
          </a>
          <Link
            href="/"
            className="border border-stone-900 bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800"
          >
            Contactar
          </Link>
        </nav>
      </div>
    </header>
  );
}
