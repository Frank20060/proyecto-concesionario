# Grand Motors

> Plataforma full-stack para la publicación y gestión de vehículos de ocasión.

[![Frontend](https://img.shields.io/badge/frontend-Next.js%2016-black?logo=next.js)](frontend/)
[![Backend](https://img.shields.io/badge/backend-Django%205-0c4b33?logo=django)](backend/)
[![Database](https://img.shields.io/badge/database-PostgreSQL-336791?logo=postgresql)](https://www.postgresql.org/)
[![Deploy](https://img.shields.io/badge/deploy-Vercel%20%2B%20Render-111111?logo=vercel)](DEPLOY.md)

Grand Motors es un monorepo que combina una experiencia pública de catálogo, optimizada para SEO y conversión, con un panel privado para gestionar el inventario de un concesionario. El proyecto está diseñado como una aplicación real: catálogo filtrable, fichas de vehículo, galería de imágenes, gestión de stock y despliegue separado de frontend y backend.

## Demo

- **Web pública:** [grandmotors.vercel.app](https://grandmotors.vercel.app)
- **API y panel:** [intragrandmotors.onrender.com](https://intragrandmotors.onrender.com)

> Las URLs de demo dependen de la configuración activa de los servicios desplegados.

## Qué incluye

### Catálogo público

- Listado de vehículos disponibles y vendidos.
- Filtros por marca, texto y estado.
- Fichas individuales con URL amigable y slug decorativo.
- Galería responsive con selección de imagen principal.
- Información técnica, precio, kilometraje y descripción.
- Acciones de contacto y acceso directo a WhatsApp.

### SEO y rendimiento

- App Router de Next.js con renderizado server-side.
- Metadatos dinámicos por vehículo.
- Open Graph y Twitter Cards.
- Datos estructurados JSON-LD para concesionario, vehículos, ofertas y preguntas frecuentes.
- `sitemap.xml` y `robots.txt` generados desde la aplicación.
- `next/image` y transformaciones `f_auto,q_auto` de Cloudinary.

### Panel de gestión

- Autenticación de Django.
- Alta, edición y eliminación de vehículos.
- Carga múltiple de imágenes.
- Ordenación drag and drop de la galería.
- Gestión de vehículos disponibles y vendidos.
- Filtros y métricas de inventario.

### Almacenamiento de imágenes

- Cloudinary como almacenamiento principal en producción.
- Subidas firmadas desde Django mediante el SDK oficial.
- URLs `secure_url` guardadas en la base de datos.
- Migración incluida para imágenes históricas almacenadas localmente.
- Fallback temporal a archivos locales durante la transición.

## Arquitectura

```text
                         +----------------------+
                         |       Vercel         |
                         |  Next.js + React     |
                         +----------+-----------+
                                    | HTTPS / JSON
                                    v
                         +----------------------+
                         |       Render         |
                         | Django + Gunicorn    |
                         +-------+-------+------+
                                 |       |
                                 v       v
                         PostgreSQL  Cloudinary
                         inventario   imágenes
```

El frontend público vive en Next.js y consume la API de Django. Django concentra la autenticación, las operaciones de inventario y las subidas firmadas. PostgreSQL almacena los datos de negocio y Cloudinary sirve las imágenes desde su CDN.

## Stack

### Frontend

- Next.js 16 y React 19.
- TypeScript.
- Tailwind CSS 4.
- App Router, Server Components y generación dinámica de metadata.
- `next/image` para renderizado optimizado.

### Backend

- Python 3.12.
- Django 5.
- API JSON propia.
- PostgreSQL con `dj-database-url`.
- Gunicorn para producción.
- WhiteNoise para archivos estáticos.
- Cloudinary SDK para imágenes.

### Infraestructura

- Vercel para el frontend.
- Render para backend y PostgreSQL.
- Cloudinary para almacenamiento y CDN de imágenes.
- Docker Compose para desarrollo local.

## Estructura del monorepo

```text
.
├── backend/
│   ├── config/              # Configuración Django
│   ├── vehicles/            # Modelos, API, panel y plantillas
│   ├── scripts/             # Migración de imágenes a Cloudinary
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── app/                 # Rutas públicas Next.js
│   ├── components/          # Componentes de interfaz
│   ├── lib/                 # API, imágenes y configuración
│   └── types/
├── docker-compose.yml
├── render.yaml
└── DEPLOY.md
```

## Ejecutar en local

### Con Docker

```bash
docker compose up --build
```

- Web pública: <http://localhost:3000>
- Dashboard Django: <http://localhost:8000>
- API: <http://localhost:8000/api/vehicles/>

### Sin Docker

Backend:

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS/Linux
# source .venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py seed_db
python manage.py runserver 0.0.0.0:8000
```

Frontend, en otra terminal:

```bash
cd frontend
npm install
npm run dev
```

## Variables de entorno

### Backend

```env
DJANGO_SECRET_KEY=...
DJANGO_DEBUG=False
DATABASE_URL=...
DJANGO_ALLOWED_HOSTS=...
CORS_ALLOWED_ORIGINS=...
CSRF_TRUSTED_ORIGINS=...
PUBLIC_BASE_URL=https://tu-backend.onrender.com
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Frontend

```env
NEXT_PUBLIC_SITE_URL=https://tu-frontend.vercel.app
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com
API_INTERNAL_URL=https://tu-backend.onrender.com
```

Consulta [DEPLOY.md](DEPLOY.md) para el proceso completo de despliegue y migración de imágenes. No guardes secretos en el repositorio ni expongas las credenciales de Cloudinary en el frontend.

## Migrar imágenes históricas

Después de aplicar las migraciones y configurar Cloudinary, ejecuta desde `backend/`:

```bash
python scripts/migrate_images_to_cloudinary.py
```

El script es idempotente: solo procesa imágenes que todavía no tienen `cloudinary_url`.

## Comprobaciones

```bash
# Backend
cd backend
python manage.py check
python manage.py test

# Frontend
cd frontend
npm run build
```

## Decisiones destacadas

- **Frontend y backend desacoplados:** Next.js optimiza la experiencia pública y Django mantiene la lógica de negocio y administración.
- **Slugs decorativos:** las rutas son legibles para SEO, pero la identidad del vehículo sigue dependiendo de su ID estable.
- **Subida firmada de imágenes:** las credenciales privadas permanecen en el backend; el navegador nunca recibe el API secret de Cloudinary.
- **Migración gradual:** el modelo conserva un fallback local para no romper registros durante el cambio de proveedor.
- **Configuración por entorno:** Render y Vercel pueden desplegarse de forma independiente sin hardcodear URLs de infraestructura.

## Licencia

Este proyecto se distribuye bajo licencia MIT.
