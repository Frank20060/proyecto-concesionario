# 🚗 Concesionario de Vehículos de Ocasión — Grand Motors

Sistema web full-stack monorepo para la gestión y publicación de catálogo de vehículos de ocasión, compuesto por una web pública orientada a SEO y conversión (Next.js 16) y un panel de administración con API REST (Django 5 + PostgreSQL).

---

## 🌟 Características Principales

- **Catálogo Interactivo**: Filtrado en tiempo real por marca, término de búsqueda y estado (disponible / vendido).
- **SEO de Alto Rendimiento**:
  - Rutas amigables con slug decorativo (`/vehicles/123/bmw-m3-2021`).
  - Metadatos dinámicos (`generateMetadata`), Open Graph y Twitter Cards para redes sociales.
  - Datos estructurados **JSON-LD (Schema.org)** para `AutoDealer`, `Car`, `Offer` y `FAQPage`.
  - Generación dinámica de `sitemap.xml` y `robots.txt`.
- **Panel de Gestión Admin**: Dashboard integrado en Django para alta, edición, ordenación de imágenes y eliminación de vehículos.
- **Autosembrado de Datos (`seed_db`)**: Inicialización automática con superusuario por defecto y vehículos de muestra con fotografías reales.
- **Diseño Responsive & UI de Altas Prestaciones**: Estilo limpio desarrollado con Tailwind CSS, tipografía optimizada y componentes de interacción rápida (WhatsApp directo, galería de imágenes, ficha técnica).

---

## 🛠️ Stack Tecnológico

### Frontend (`/frontend`)
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Biblioteca UI**: React 19 + TypeScript
- **Estilos**: Tailwind CSS v4
- **Optimización**: `next/image` y fuentes optimizadas

### Backend (`/backend`)
- **Lenguaje / Framework**: Python 3.12 + [Django 5](https://www.djangoproject.com/)
- **Servidor de Producción**: Gunicorn
- **Servicio de Archivos Estáticos**: WhiteNoise
- **Base de Datos**: PostgreSQL / SQLite (desarrollo local)
- **Imágenes**: Pillow + FileSystemStorage (`/media/vehicles/`)

### Infraestructura & Despliegue
- **Contenedores**: Docker & Docker Compose
- **Backend & BD**: [Render](https://render.com) (Blueprint con PostgreSQL)
- **Frontend**: [Vercel](https://vercel.com)

---

## 📐 Decisiones de Arquitectura y Diseño

1. **Separación Frontend / Backend (Monorepo)**:
   - Permite que el frontend sea ultra-rápido mediante SSR/SSG en Vercel, mientras el backend en Django se encarga de la seguridad, panel administrativo y gestión de datos.

2. **Rutas con Slugs Decorativos para SEO**:
   - Las URLs incluyen el nombre y año del coche (ej: `/vehicles/42/audi-a4-avant-2021`), pero la lógica interna solo utiliza la ID numérica. Esto optimiza el posicionamiento en motores de búsqueda sin añadir fragilidad al sistema de routing.

3. **Sembrado Automático en el Despliegue (`seed_db`)**:
   - En el `build.sh` del backend se ejecuta la orden `python manage.py seed_db`. Si la base de datos está recién creada, genera automáticamente el superusuario administrador y crea un catálogo de vehículos de muestra con imágenes precargadas.

4. **Resiliencia de Entorno y CORS/CSRF**:
   - El archivo `settings.py` cuenta con funciones de saneamiento que eliminan automáticamente prefijos (`https://`) y barras finales (`/`) en variables de entorno como `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS` y `CSRF_TRUSTED_ORIGINS`, asegurando compatibilidad total con Render y Vercel.

---

## 🚀 Cómo Usar el Proyecto

### Opción 1: Desarrollo Local con Docker (Recomendado)

Ejecuta ambos servicios (Backend en puerto 8000 y Frontend en puerto 3000) en una sola orden:

```bash
docker compose up --build
```

- **Web Pública**: [http://localhost:3000](http://localhost:3000)
- **Dashboard Admin (Django)**: [http://localhost:8000/admin/](http://localhost:8000/admin/)
- **Credenciales Admin por defecto**:
  - **Usuario**: `admin`
  - **Contraseña**: `admin1234`

---

### Opción 2: Desarrollo Local Manual

#### 1. Backend (Django)
```bash
cd backend
python -m venv venv
# En Windows:
.\venv\Scripts\activate
# En Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py seed_db
python manage.py runserver 0.0.0.0:8000
```

#### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

---

## ☁️ Despliegue en Producción (Render + Vercel)

Para más detalles, consulta la guía completa en [DEPLOY.md](DEPLOY.md).

### Resumen rápido:

1. **Backend en Render**:
   - Crea un **Blueprint** conectando este repositorio. Render leerá [`render.yaml`](render.yaml) y creará la base de datos PostgreSQL y el servicio `intragrandmotors`.
   - Variables requeridas en Render:
     - `DJANGO_ALLOWED_HOSTS`: `intragrandmotors.onrender.com`
     - `CORS_ALLOWED_ORIGINS`: `https://grandmotors.vercel.app`
     - `CSRF_TRUSTED_ORIGINS`: `https://grandmotors.vercel.app,https://intragrandmotors.onrender.com`
     - `PUBLIC_BASE_URL`: `https://intragrandmotors.onrender.com`

2. **Frontend en Vercel**:
   - Importa la carpeta `frontend/`.
   - Variables requeridas en Vercel:
     - `NEXT_PUBLIC_SITE_URL`: `https://grandmotors.vercel.app`
     - `NEXT_PUBLIC_API_URL`: `https://intragrandmotors.onrender.com`
     - `API_INTERNAL_URL`: `https://intragrandmotors.onrender.com`

---

## 📝 Licencia

Este proyecto se distribuye bajo la licencia MIT.
