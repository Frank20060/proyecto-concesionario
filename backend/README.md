# Grand Motors Backend

Backend y panel privado de Grand Motors. Esta aplicación Django gestiona el inventario de vehículos, expone la API pública que consume Next.js y centraliza la autenticación y las subidas firmadas de imágenes a Cloudinary.

Para conocer el producto completo y la arquitectura del monorepo, consulta el [README raíz](../README.md).

## Responsabilidades

- Servir el dashboard privado del concesionario.
- Gestionar vehículos, disponibilidad, precios y kilometraje.
- Exponer el catálogo mediante una API JSON pública.
- Recibir y validar formularios de alta y edición.
- Subir imágenes a Cloudinary desde el servidor.
- Guardar `secure_url` y `public_id` de cada imagen.
- Mantener la ordenación de las galerías.
- Eliminar los assets correspondientes cuando se elimina una imagen.
- Ejecutar migraciones y sembrar datos iniciales.

## Stack

- Python 3.12.
- Django 5.
- PostgreSQL en producción.
- SQLite opcional para desarrollo local.
- Gunicorn.
- WhiteNoise para archivos estáticos.
- Pillow para validación de imágenes.
- Cloudinary SDK para almacenamiento y CDN.

## Estructura

```text
config/
  settings.py             # Configuración, CORS, CSRF y Cloudinary
  urls.py                 # Rutas del panel, API y health check
vehicles/
  models.py               # Vehicle y VehicleImage
  views.py                # Dashboard, API y operaciones de inventario
  forms.py                # Formularios de gestión
  cloudinary_service.py   # Subida y eliminación de imágenes
  templates/              # Interfaz HTML del panel
  static/                 # CSS y JavaScript del dashboard
  migrations/             # Historial de cambios de base de datos
scripts/
  migrate_images_to_cloudinary.py
manage.py
requirements.txt
```

## Desarrollo local

Desde esta carpeta:

```bash
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

Rutas útiles:

- Dashboard: <http://localhost:8000/>
- Login: <http://localhost:8000/login/>
- API de vehículos: <http://localhost:8000/api/vehicles/>
- Health check: <http://localhost:8000/health/>

También puedes levantar el monorepo completo con Docker Compose desde la raíz:

```bash
docker compose up --build
```

## Variables de entorno

```env
DJANGO_SECRET_KEY=...
DJANGO_DEBUG=True
DATABASE_URL=...
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
CSRF_TRUSTED_ORIGINS=http://localhost:3000,http://localhost:8000
PUBLIC_BASE_URL=http://localhost:8000

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

El API secret de Cloudinary solo debe existir en el backend. No se usa `CLOUDINARY_UPLOAD_PRESET` porque el servidor realiza subidas firmadas.

## API

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/vehicles/` | Lista vehículos disponibles |
| `GET` | `/api/vehicles/brands/` | Lista marcas disponibles |
| `GET` | `/api/vehicles/<id>/` | Devuelve el detalle de un vehículo |
| `GET` | `/health/` | Comprueba que el servicio está disponible |

La respuesta de cada vehículo incluye un array `images` con URLs completas de Cloudinary:

```json
{
  "id": 9,
  "brand": "Toyota",
  "model": "C-HR",
  "images": [
    "https://res.cloudinary.com/example/image/upload/v1/concesionario/vehicles/photo.jpg"
  ]
}
```

## Flujo de imágenes

1. El usuario selecciona imágenes en el formulario Django.
2. `cloudinary_service.py` las sube mediante la API firmada.
3. La base de datos guarda `cloudinary_url` y `cloudinary_public_id`.
4. La API devuelve `cloudinary_url` al frontend.
5. Al eliminar una imagen, se elimina también su asset de Cloudinary.

Las imágenes históricas pueden migrarse con:

```bash
python scripts/migrate_images_to_cloudinary.py
```

El script solo procesa registros que todavía no tienen `cloudinary_url`, por lo que puede ejecutarse más de una vez sin duplicar la migración.

## Comprobaciones

```bash
python manage.py check
python manage.py test
python -m py_compile config/settings.py vehicles/models.py vehicles/views.py vehicles/signals.py vehicles/cloudinary_service.py
```

## Producción

El backend se despliega en Render mediante `render.yaml`:

- Build: instala dependencias, recopila estáticos, aplica migraciones y ejecuta `seed_db`.
- Runtime: Gunicorn escuchando en el puerto que proporciona Render.
- Base de datos: PostgreSQL gestionado por Render.
- Imágenes: Cloudinary.

Consulta [DEPLOY.md](../DEPLOY.md) para la configuración de Render, las variables de entorno y el orden recomendado para migrar imágenes.
