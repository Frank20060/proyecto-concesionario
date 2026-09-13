export default function Footer() {
  return (
    <footer className="mt-auto bg-[#1e2024] text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p
              className="font-serif text-lg font-semibold text-white"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Grand Motors
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone-400">
              Más de 20 años ayudando a nuestros clientes a encontrar el vehículo
              adecuado.
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-orange-400">
              Horario
            </p>
            <p className="mt-2 text-sm text-stone-300">
              Lun – Vie: 9:30 – 20:00
              <br />
              Sáb: 10:00 – 14:00
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-orange-400">
              Servicios
            </p>
            <ul className="mt-2 space-y-1 text-sm text-stone-300">
              <li>Venta de vehículos</li>
              <li>Financiación a medida</li>
              <li>Garantía mecánica</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-8 text-center text-sm text-stone-500">
          © {new Date().getFullYear()} Grand Motors. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
