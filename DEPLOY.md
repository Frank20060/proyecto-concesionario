# Despliegue: Render (backend) + Vercel (frontend)

Monorepo con dos servicios:

| Parte | Plataforma | Carpeta |
|-------|------------|---------|
| API + Dashboard Django | [Render](https://render.com) | `backend/` |
| Web pública Next.js | [Vercel](https://vercel.com) | `frontend/` |

---

## 1. Backend en Render

### Opción A — Blueprint (recomendada)

1. Sube el repo a GitHub/GitLab.
2. En Render: **New → Blueprint** → conecta el repo.
3. Render lee [`render.yaml`](render.yaml) y crea:
   - PostgreSQL (`concesionario-db`)
   - Web service Python (`intragrandmotors`)
   - Disco persistente de 1 GB en `/app/media` (fotos de vehículos)

### Opción B — Manual

1. **New → PostgreSQL** → anota la `Internal Database URL`.
2. **New → Web Service** → Runtime: Python, **Root Directory**: `backend`.
3. **Build Command**: `chmod +x build.sh && ./build.sh`
4. **Start Command**: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --timeout 120`
5. **Health Check Path**: `/health/`
6. Añade un **Persistent Disk** montado en `/app/media` (1 GB mínimo).

### Variables de entorno (Render)

Copia desde [`backend/.env.example`](backend/.env.example) y ajusta:

| Variable | Ejemplo |
|----------|---------|
| `DJANGO_SECRET_KEY` | (Render puede generarla) |
| `DJANGO_DEBUG` | `False` |
| `DJANGO_ALLOWED_HOSTS` | `intragrandmotors.onrender.com` |
| `DATABASE_URL` | (automática si vinculas la BD) |
| `CORS_ALLOWED_ORIGINS` | `https://grandmotors.vercel.app` |
| `CSRF_TRUSTED_ORIGINS` | `https://grandmotors.vercel.app,https://intragrandmotors.onrender.com` |
| `PUBLIC_BASE_URL` | `https://intragrandmotors.onrender.com` |
| `MEDIA_ROOT` | `/app/media` |

### Primer arranque

En **Render Shell** del servicio web:

```bash
python manage.py createsuperuser
```

- Dashboard admin: `https://intragrandmotors.onrender.com/`
- API JSON: `https://intragrandmotors.onrender.com/api/vehicles/`
- Health: `https://intragrandmotors.onrender.com/health/`

---

## 2. Frontend en Vercel

1. **New Project** → importa el mismo repo.
2. **Root Directory**: `frontend`
3. Framework: Next.js (auto-detectado).
4. Añade variables desde [`frontend/.env.example`](frontend/.env.example):

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://grandmotors.vercel.app` |
| `NEXT_PUBLIC_API_URL` | `https://intragrandmotors.onrender.com` |
| `API_INTERNAL_URL` | `https://intragrandmotors.onrender.com` |

5. Deploy.

El frontend llama a la API de Render en build (sitemap) y en runtime. Las imágenes pasan por rewrite `/media/*` → backend.

---

## 3. Conectar ambos servicios

Después del primer deploy de Vercel, actualiza en **Render**:

```
CORS_ALLOWED_ORIGINS=https://grandmotors.vercel.app
CSRF_TRUSTED_ORIGINS=https://grandmotors.vercel.app,https://intragrandmotors.onrender.com
```

Redeploy del backend si cambias CORS.

---

## 4. Desarrollo local (Docker)

Sin cambios:

```powershell
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend / dashboard: http://localhost:8000

---

## 5. Notas importantes

### Plan free de Render

- El servicio **se duerme** tras inactividad (~50 s de cold start).
- El disco persistente **no está en plan free** del web service — en free las fotos se pierden al redeploy. Para producción real:
  - Sube a plan Starter + disco, **o**
  - Integra almacenamiento externo (S3 / Cloudinary).

### HTTPS

Con `DJANGO_DEBUG=False`, Django fuerza HTTPS vía proxy de Render (`SECURE_PROXY_SSL_HEADER`).

### Dominio propio

- **Vercel**: añade dominio en Project Settings → Domains. Actualiza `NEXT_PUBLIC_SITE_URL`.
- **Render**: Custom Domain en el web service. Añade el dominio a `DJANGO_ALLOWED_HOSTS` y `CSRF_TRUSTED_ORIGINS`.

---

## Checklist pre-producción

- [ ] `DJANGO_SECRET_KEY` único y secreto
- [ ] `DJANGO_DEBUG=False`
- [ ] `PUBLIC_BASE_URL` = URL pública del backend
- [ ] CORS con URL exacta de Vercel (sin barra final)
- [ ] Superuser creado en Render Shell
- [ ] Disco persistente montado en `/app/media` (o storage externo)
- [ ] Variables Vercel con URL de Render
- [ ] Probar catálogo, ficha vehículo e imágenes en producción
