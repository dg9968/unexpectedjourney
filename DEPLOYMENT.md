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

## Publicar en otro servidor

Instala las dependencias y genera la versión de producción:

```bash
npm ci
npm run build
npm run start
```

Configura el servidor o proxy para dirigir el tráfico al proceso de Node. Si el proveedor usa un flujo propio para proyectos Next.js, importa el repositorio y usa los mismos comandos de instalación y compilación.

Antes de publicar, confirma el teléfono, correo, fechas, precios y disponibilidad de cada programa en `app/data.ts` y `app/components.tsx`.

