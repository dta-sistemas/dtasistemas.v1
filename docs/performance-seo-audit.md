# Performance + SEO Audit — Fase 9

Auditoría del sitio completo construido en Fases 1–8, siguiendo el checklist
de Fase 0, sección 41: Lighthouse, Core Web Vitals, metadata, headings,
links, imágenes, sitemap, robots, canonical, Schema, indexabilidad y
accesibilidad. Este documento lista cada hallazgo, su severidad, y la
corrección aplicada (o la razón por la que se deja documentada para una
fase posterior).

**Nota metodológica:** esta auditoría es una revisión estática de código —
no hay un proyecto Next.js corriendo en este entorno de chat para ejecutar
Lighthouse real. Cada hallazgo se identificó revisando el árbol de
componentes, metadata, y datos generados en fases anteriores, y las
correcciones son cambios de código reales, no simulados. La ejecución de
Lighthouse/PageSpeed Insights contra el sitio desplegado sigue siendo
necesaria una vez esté en Vercel (Fase 10) para confirmar las métricas con
datos reales de red y dispositivo.

---

## Hallazgos corregidos

### 1. 🔴 Títulos duplicando el nombre de marca (16 páginas)

**Severidad: alta — afecta CTR en resultados de búsqueda y es visible para cualquier usuario que mire la pestaña del navegador.**

El layout raíz define un `template: "%s | DTA Sistemas"` que Next.js aplica
automáticamente a cualquier `title` que una página defina como string. Pero
16 títulos definidos en fases anteriores (5 en `data/solutions.ts`, 4 en
`data/sectors.ts`, 4 en `data/projects.ts`, 3 en `content/blog/*.mdx`) ya
incluían "— DTA Sistemas" o "| DTA Sistemas" dentro del string, más el
título de la Home. Resultado real en el `<title>` del navegador, por ejemplo:

```
Sistemas empresariales a la medida — DTA Sistemas | DTA Sistemas
```

**Corrección:** se quitó el sufijo de marca de los 16 `metaTitle` (ahora
solo contienen el título específico de la página) y la Home pasó a usar
`title: { absolute: "..." }` para conservar su título completo sin que el
template le agregue nada. El sufijo de marca ahora se aplica en un solo
lugar (el template del layout raíz) para todas las páginas del catálogo.

### 2. 🟠 `metadataBase` no configurado

**Severidad: media-alta — afecta canonical, Open Graph y Twitter Cards en toda página.**

Sin `metadataBase`, Next.js no puede garantizar que `alternates.canonical`,
`openGraph.url` y `openGraph.images` se resuelvan como URLs absolutas —
dependiendo del entorno, pueden emitirse como rutas relativas, que muchos
crawlers y todas las plataformas sociales (Facebook, X, LinkedIn) ignoran o
interpretan mal.

**Corrección:** se agregó `metadataBase: new URL(SITE_URL)` en
`app/layout.tsx`.

### 3. 🟠 Sin metadata de Twitter/X

**Severidad: media — pedido explícito de Fase 0, sección 15, nunca implementado.**

**Corrección:** se agregó `twitter: { card: "summary_large_image", site: "@dtasistemas" }`
en el layout raíz. El handle de X es placeholder, ver pendientes.

### 4. 🟠 Sin imagen Open Graph por defecto

**Severidad: media — cualquier página sin `openGraph.images` propio se comparte sin imagen en redes sociales.**

**Corrección:** se agregó un `openGraph.images` por defecto en el layout
raíz (`/images/og-default.jpg`, placeholder — ver pendientes de asset) para
que ninguna página quede sin imagen al compartirse, y `siteName`/`locale`
(`es_MX`) también por defecto.

### 5. 🟡 `BreadcrumbList` sin el nodo "Inicio"

**Severidad: media-baja — inconsistencia entre lo visible y el dato estructurado.**

El breadcrumb visible (`components/navigation/Breadcrumb.tsx`) siempre
muestra un ícono de casa enlazando a `/`, pero el JSON-LD `BreadcrumbList`
generado por `buildBreadcrumbSchema()` nunca incluía ese primer nodo — Google
podía interpretar el breadcrumb estructurado como si la jerarquía empezara
en la segunda categoría, no en Inicio.

**Corrección:** `buildBreadcrumbSchema()` ahora antepone automáticamente
`{ name: "Inicio", path: "/" }` — ningún call site tuvo que cambiar.

### 6. 🟡 Formulario de contacto: labels sin asociación programática

**Severidad: media — accesibilidad (WCAG 2.1, criterio 1.3.1 y 3.3.2).**

`components/forms/FormField.tsx` (Fase 7) renderizaba `<label>` visualmente
junto al input, pero sin `htmlFor`/`id` que los conecte. Un lector de
pantalla no podía anunciar "Nombre completo, campo de texto" al enfocar el
input — solo leía el input sin su etiqueta. Tampoco existía
`aria-describedby` que conectara el mensaje de error con su campo.

**Corrección:** cada campo genera un `id` único (`useId()`) usado en
`htmlFor` del label y `id` del control; el mensaje de error se conecta vía
`aria-describedby` solo cuando existe.

### 7. 🟡 Imágenes `fill` sin atributo `sizes`

**Severidad: media — impacto directo en LCP/peso de página (Core Web Vitals).**

`SectorCard`, `ProjectCard` y `BlogCard` usan `<Image fill />` dentro de
grids responsive (2 a 5 columnas según breakpoint) sin `sizes`. Sin ese
atributo, Next.js no puede calcular qué variante de la imagen servir en
cada breakpoint y por defecto sirve la más grande disponible en todos los
tamaños de pantalla — descargando más bytes de los necesarios en mobile.

**Corrección:** se agregó `sizes="(min-width: 768px) 25vw, 50vw"` (o `20vw`
en `SectorCard`, cuyo grid llega a 5 columnas) a los tres componentes.

### 8. 🟡 Sin página 404 propia

**Severidad: media-baja — UX y SEO (una 404 genérica sin navegación aumenta el rebote y no ayuda a recuperar al visitante).**

No existía `app/not-found.tsx` en ninguna fase anterior — Next.js mostraba
su página 404 genérica, sin marca ni forma de volver a navegar el sitio.

**Corrección:** se agregó `app/not-found.tsx` con la identidad visual del
sitio, `robots: { index: false, follow: true }`, y CTAs de regreso a Inicio
y Soluciones.

### 9. 🟢 Íconos decorativos sin `aria-hidden`

**Severidad: baja — ruido menor para usuarios de lector de pantalla, no bloquea el uso del sitio.**

`IconCircle` (usado en ~15+ lugares: pilares, "Así trabajamos", canales de
contacto...) y el ícono de flecha dentro de `Button`/`TrackedButton` (usado
en todo botón/CTA del sitio) no marcaban sus SVG como decorativos. El
ícono siempre acompaña a un texto que ya describe el contenido, así que el
ícono no aporta información — solo ruido.

**Corrección:** se agregó `aria-hidden="true"` a ambos, cubriendo la gran
mayoría de las apariciones de íconos decorativos del sitio con dos cambios
centralizados.

### 10. 🟢 `SITE_URL` duplicado en 4 archivos

**Severidad: baja hoy, alta si se descuida al confirmar el dominio real.**

`app/sitemap.ts`, `app/robots.ts`, `lib/seo/schema.ts` y `app/layout.tsx`
declaraban el mismo `SITE_URL` de forma independiente. Al confirmar el
dominio final, actualizar solo 3 de los 4 dejaría el sitemap, el robots.txt
o el Schema.org apuntando a un dominio distinto del canonical real — un
bug silencioso y difícil de detectar sin comparar los 4 archivos a mano.

**Corrección:** se centralizó en `lib/site.ts`; los 4 archivos ahora
importan la misma constante. Confirmar el dominio final requiere editar un
solo archivo.

### 11. 🟢 Sin `next.config` explícito

**Severidad: baja — el sitio funciona con los defaults de Next.js, pero conviene declarar la configuración a propósito.**

**Corrección:** se agregó `next.config.mjs` con `reactStrictMode: true` y
formatos de imagen explícitos (AVIF antes que WebP, mejor compresión a
calidad similar).

---

## Verificado y ya correcto (sin cambios necesarios)

- **Jerarquía de encabezados:** se auditaron las 22 rutas del sitio — cada
  página tiene exactamente un `<h1>` (viviendo en el template compartido
  cuando la página lo usa: `SolutionDetail`, `SectorDetail`, `Hero`) y las
  subsecciones usan `<h2>`/`<h3>` de forma consistente.
- **Contraste de color:** se verificaron manualmente los pares texto/fondo
  del Design System — `dta-gray-600` sobre blanco (~6:1) y `dta-blue-600`
  sobre blanco (~6.6:1) pasan WCAG AA para texto normal (mínimo 4.5:1) con
  margen.
- **`robots.txt`/`sitemap.xml`:** ya dinámicos desde Fase 6, se generan
  solos a partir de todo el contenido — no requirieron cambios de fondo,
  solo la centralización de `SITE_URL` (hallazgo #10).
- **JSON-LD:** los 6 tipos de Schema (`Organization`, `Service`,
  `BreadcrumbList`, `AboutPage`, `Article`, `CreativeWork`, `LocalBusiness`)
  se generan a partir de datos internos controlados (nunca de input de
  usuario), sin riesgo de inyección en el `dangerouslySetInnerHTML` de
  `JsonLd.tsx`.
- **URLs limpias:** ninguna ruta usa query strings para identificar
  contenido (`?id=`); todo el catálogo usa slugs semánticos.
- **Componentes cliente:** se revisó que el uso de `"use client"` sigue
  siendo mínimo y deliberado (formularios, tabs, tracking) — ninguna página
  completa se convirtió en Client Component innecesariamente en ninguna
  fase.

---

## Pendiente — no se puede resolver desde este entorno

| Pendiente | Por qué no se resuelve aquí |
|---|---|
| Ejecutar Lighthouse/PageSpeed Insights real | Requiere el sitio desplegado (Fase 10) |
| Confirmar dominio final | Pendiente de negocio desde Fase 3 — ahora solo requiere editar `lib/site.ts` |
| Asset real de `/images/og-default.jpg` | Mismo estado que las demás imágenes pendientes (sectores, proyectos, blog) señaladas desde Fase 4 |
| Handle real de X/Twitter (`twitter.site`) | Placeholder `@dtasistemas`, confirmar o quitar el campo |
| Headers de seguridad (CSP, X-Frame-Options, etc.) | Corresponde a Fase 10 (Seguridad + Deploy) según el roadmap de Fase 0, no a esta fase |

---

## Checklist de QA — Fase 9

- [x] Metadata (title/description/canonical) revisada en las 22 páginas —
      bug de títulos duplicados encontrado y corregido en 16 de ellas.
- [x] Jerarquía de encabezados auditada — sin hallazgos, ya era correcta.
- [x] Enlaces internos verificados — no se encontraron enlaces rotos nuevos
      (los dos bugs de slug de fases anteriores ya se habían corregido en
      Fases 6 y 8).
- [x] Imágenes — `sizes` agregado donde faltaba; `alt` ya presente en el
      100% de los usos de `next/image` desde que se introdujeron (Fase 4).
- [x] Sitemap/robots — funcionales desde Fase 6, ahora con dominio
      centralizado.
- [x] Canonical — ahora resuelve correctamente gracias a `metadataBase`.
- [x] Schema.org — `BreadcrumbList` corregido para incluir Inicio; el resto
      ya era válido.
- [x] Indexabilidad — `/design-system` sigue `noindex`; nueva página 404
      también marcada `noindex, follow`.
- [x] Accesibilidad — formulario corregido (labels + aria-describedby),
      íconos decorativos marcados `aria-hidden` en los dos componentes de
      mayor reutilización del sitio.
- [ ] Lighthouse/Core Web Vitals con datos reales — pendiente de Fase 10
      (deploy).

---
**Estado:** Fase 9 completa — pendiente de tu validación antes de iniciar
Fase 10 (Seguridad + Deploy: Cloudflare, Vercel, variables de entorno,
headers de seguridad, dominio, SSL, entornos de development/staging/production).
