
# Grand Motors Frontend

Frontend público de Grand Motors, construido con Next.js y orientado a ofrecer una experiencia rápida de catálogo para un concesionario de vehículos de ocasión.

Forma parte del monorepo principal. Para conocer la arquitectura completa, el backend y el despliegue, consulta el [README raíz](../README.md).

## Responsabilidades

- Presentar el catálogo de vehículos.
- Filtrar por marca, búsqueda y estado.
- Renderizar fichas con rutas SEO-friendly.
- Mostrar galerías, especificaciones y precios.
- Generar metadata, Open Graph, sitemap y datos estructurados.
- Consumir la API pública de Django.
- Servir imágenes optimizadas desde Cloudinary mediante `next/image`.

## Stack

- Next.js 16 con App Router.
- React 19.
- TypeScript.
- Tailwind CSS 4.
- `next/image` y fuentes optimizadas.
- Vercel para producción.

## Estructura

```text
app/                  # Rutas, metadata y páginas públicas
components/           # Header, footer, catálogo, galería y UI
lib/api/              # Cliente de la API Django
lib/images.ts         # Normalización y optimización de imágenes
lib/site.config.ts    # Configuración SEO y de marca
types/                # Tipos compartidos del frontend
public/               # Recursos estáticos
```

## Desarrollo local

Desde esta carpeta:

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>.

El frontend necesita que Django esté disponible en `http://localhost:8000`, salvo que se configure otra URL mediante variables de entorno.

## Variables de entorno

Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
API_INTERNAL_URL=http://localhost:8000
```

En Vercel, `NEXT_PUBLIC_API_URL` y `API_INTERNAL_URL` deben apuntar a la URL pública de Render. No pongas aquí claves privadas de Cloudinary: las subidas se realizan desde Django.

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servir el build generado
npm run lint     # Comprobar el código
```

## Imágenes

La API devuelve URLs completas de Cloudinary. `lib/images.ts` conserva compatibilidad con rutas locales antiguas, pero las imágenes nuevas y migradas se sirven desde `res.cloudinary.com` con transformaciones automáticas `f_auto,q_auto`.

## Despliegue

En Vercel:

1. Selecciona `frontend/` como Root Directory.
2. Configura las variables de entorno de producción.
3. Ejecuta el deploy normalmente.

Consulta [DEPLOY.md](../DEPLOY.md) para conectar Vercel con Render y Cloudinary.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
