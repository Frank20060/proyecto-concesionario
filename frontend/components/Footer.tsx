export default function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p
              className="font-serif text-lg font-semibold text-stone-900"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Grand Motors
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone-500">
              Más de 20 años ayudando a nuestros clientes a encontrar el vehículo
              adecuado.
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
              Horario
            </p>
            <p className="mt-2 text-sm text-stone-600">
              Lun – Vie: 9:30 – 20:00
              <br />
              Sáb: 10:00 – 14:00
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
              Servicios
            </p>
            <ul className="mt-2 space-y-1 text-sm text-stone-600">
              <li>Venta de vehículos</li>
              <li>Financiación a medida</li>
              <li>Garantía mecánica</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-stone-200 pt-8 text-center text-sm text-stone-400">
          © {new Date().getFullYear()} Grand Motors. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
