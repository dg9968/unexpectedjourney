# Unexpected Journey — guía de entrega

## Qué incluye

- Página principal orientada a conversión.
- Páginas de destino para Londres, Toronto, Montreal y Rancho El Lucero.
- Páginas de ejemplo para Sierra Nevada, Thomas Jefferson y Academia Maddox.
- Diseño adaptable para celular, tableta y escritorio.
- Llamadas directas a WhatsApp y correo.
- Imagen social para compartir el sitio.

## Editar escuelas y destinos

Todo el contenido reutilizable vive en `app/data.ts`.

- Para agregar una escuela, duplica un objeto dentro de `schools`, cambia su `slug`, nombre, ciudad, introducción y destinos destacados.
- Para agregar un destino, duplica un objeto dentro de `destinations`, agrega una imagen en `public/` y actualiza la ruta de `image`.
- Las páginas nuevas se crean automáticamente en `/escuelas/[slug]` y `/destinos/[slug]`.

## Ejecutar el proyecto

Requiere Node.js 22.13 o posterior.

```bash
npm ci
npm run dev
```

## Publicar en Render

El sitio corre como un proceso de Node.js normal (build "standalone" de vinext), respaldado por una base de datos Postgres en Render.

```bash
npm ci
npm run build
npm run start        # node dist/standalone/server.js
```

Este repositorio incluye un `render.yaml` (Blueprint de Render) que define el servicio web y la base de datos Postgres:

1. En el dashboard de Render, crea un nuevo **Blueprint** apuntando a este repositorio — Render leerá `render.yaml` y creará el servicio web y la base de datos automáticamente.
2. Render pedirá el valor real de `ADMIN_SECRET` (la contraseña del panel `/admin`) la primera vez — no está en el repositorio.
3. `DATABASE_URL` se conecta automáticamente a la base de datos Postgres creada por el Blueprint.
4. Antes del primer uso, aplica la migración a la base de datos real (una sola vez): `psql "$DATABASE_URL" -f drizzle/000X_*.sql` usando la cadena de conexión externa de Render, o `drizzle-kit migrate`.

Para desarrollo local, crea un archivo `.env` (no se sube a git) con:

```
DATABASE_URL=<cadena de conexión externa de la base de datos en Render>
ADMIN_SECRET=changeme-local
```

`npm run dev` carga `.env` automáticamente.

Antes de publicar, confirma el teléfono, correo, fechas, precios y disponibilidad de cada programa en `app/data.ts` y `app/components.tsx`.

