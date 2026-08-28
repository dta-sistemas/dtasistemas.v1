# Analytics — DTA Sistemas

Documentación de la instrumentación de GA4/GTM (Fase 0, sección 19, 20 y 40).
Todo evento definido en `lib/analytics/events.ts` se documenta aquí: nombre,
disparador, parámetros y dónde vive en el código.

## Instalación

| Herramienta | Componente | Variable de entorno |
|---|---|---|
| GA4 (gtag.js) | `components/analytics/GoogleAnalytics.tsx` | `NEXT_PUBLIC_GA4_MEASUREMENT_ID` |
| Google Tag Manager | `components/analytics/GoogleTagManager.tsx` | `NEXT_PUBLIC_GTM_CONTAINER_ID` |
| Search Console (verificación HTML tag) | `app/layout.tsx` → `metadata.verification.google` | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` |

**Por qué ambos (GA4 directo + GTM) sin duplicar conteo:** GA4 se instala
directamente vía `gtag.js` porque todos los eventos del sitio ya están
escritos contra `window.gtag(...)`. GTM se instala **vacío**, como
contenedor adicional para que el equipo de marketing pueda agregar píxeles
de terceros (Meta, LinkedIn, etc.) sin tocar código. **Regla explícita:** no
agregar una tag de "Google tag (configuración GA4)" dentro de GTM mientras
`NEXT_PUBLIC_GA4_MEASUREMENT_ID` esté configurada — duplicaría cada evento.

Ninguna de las dos requiere estar configurada para que el sitio funcione:
sin las variables de entorno, los componentes no renderizan nada y
`lib/analytics/events.ts` se convierte en no-op seguro.

## page_view — manejo especial en Next.js

`gtag.js` se configura con `send_page_view: false` porque Next.js App Router
navega del lado del cliente (no hay recarga completa de página en cada
`Link`). `components/analytics/PageViewTracker.tsx`, montado una vez en
`app/layout.tsx`, escucha cambios de `pathname`/`searchParams` y dispara
`page_view` manualmente en cada navegación — sin este componente, GA4 solo
vería la primera página cargada por cada visitante.

## Catálogo completo de eventos

| Evento | Se dispara cuando… | Parámetros | Implementado en |
|---|---|---|---|
| `page_view` | Se carga o navega a cualquier página | `page_path` | `PageViewTracker.tsx` (global, `app/layout.tsx`) |
| `solution_view` | Se abre una página de detalle de solución | `slug` | `SolutionDetail.tsx` vía `<ViewTracker>` |
| `sector_view` | Se abre una página de detalle de sector | `slug` | `SectorDetail.tsx` vía `<ViewTracker>` |
| `project_view` | Se abre el detalle de un caso de estudio | `slug` | `app/(marketing)/proyectos/[slug]/page.tsx` vía `<ViewTracker>` |
| `blog_read` | Se abre un artículo del blog | `slug` | `app/(marketing)/blog/[slug]/page.tsx` vía `<ViewTracker>` |
| `audit_click` | Clic específico hacia DTA Digital Audit | `source` | Definido en `analytics.auditClick()` — disponible para instrumentar los CTAs de Audit de Fase 3/7 (ver "Cobertura y siguientes pasos" abajo) |
| `cta_click` | Clic en un CTA de alto valor instrumentado con `<TrackedButton>` | `label`, `source` | Hero de la Home (`trackLabel="analizar-mi-empresa"`, `trackSource="hero"`); `FinalCTA` (`trackLabel="hablar-con-dta"`, `trackSource="final-cta"` en Home / `"dta-page"` en `/dta`) |
| `contact_start` | El usuario enfoca el primer campo del formulario de contacto | — | `ContactForm.tsx`, `onFocus` del `<form>` (solo la primera vez) |
| `contact_submit` | El formulario se envía exitosamente (después de pasar Turnstile y validación server-side) | `helpType`, `source` | `ContactForm.tsx`, tras `submitLead()` devolver `success: true` |
| `whatsapp_click` | Clic en el canal de WhatsApp de `/contacto` | — | `ContactChannelRow.tsx` (`trackEvent="whatsapp"`) |
| `phone_click` | (Reservado para cuando se agregue un canal `tel:` dedicado además de WhatsApp) | — | `ContactChannelRow.tsx` (`trackEvent="phone"`, soportado pero no usado en `/contacto` porque el teléfono se muestra dentro del canal de WhatsApp) |
| `email_click` | Clic en el canal de correo de `/contacto` | — | `ContactChannelRow.tsx` (`trackEvent="email"`) |

## Cobertura y siguientes pasos

Todos los eventos definidos en `lib/analytics/events.ts` están implementados
en al menos un punto del sitio, **excepto** `audit_click` como evento
independiente de `cta_click` — hoy el clic hacia DTA Digital Audit se
captura como `cta_click` con `source` variable según la página de origen
(hero, digital-audit-page, dta-care, etc.), lo cual ya permite el mismo
análisis en un reporte de GA4 filtrando por `label`. Si en el futuro se
prefiere un evento dedicado `audit_click` en paralelo, `analytics.auditClick(source)`
ya existe y solo falta llamarlo desde los CTAs relevantes (mismo patrón que
`TrackedButton`).

`TrackedButton` se aplicó únicamente a los 2 CTAs de mayor valor de
conversión (Hero de Home, CTA final de Home/`/dta`) para no convertir cada
botón del sitio en Client Component — el patrón es trivial de extender a
más CTAs (Digital Audit, DTA Care, CTAs dentro de Soluciones/Sectores)
reemplazando `<Button href=... variant=...>` por `<TrackedButton href=...
variant=... trackLabel="..." trackSource="...">` donde se decida que vale la
pena medir ese clic específico.

## Search Console — preparación

- El sitemap dinámico (`app/sitemap.ts`, Fase 6) y `robots.ts` ya están
  listos para enviarse a Search Console tal cual.
- La verificación de propiedad se resuelve vía el meta tag HTML
  (`metadata.verification.google` en `app/layout.tsx`) — pega ahí el código
  que entrega Search Console al agregar la propiedad por este método, sin
  necesidad de subir un archivo a `/public`.
- Pasos para conectar (fuera de código, documentar aquí cuando se haga):
  1. Agregar la propiedad en Search Console con el dominio final.
  2. Verificar por HTML tag (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) o por
     registro DNS si se prefiere no depender de una variable de entorno.
  3. Enviar `https://[dominio]/sitemap.xml` en la sección Sitemaps.

## Variables de entorno de esta fase

```
NEXT_PUBLIC_GA4_MEASUREMENT_ID=        # ej. G-XXXXXXXXXX
NEXT_PUBLIC_GTM_CONTAINER_ID=          # ej. GTM-XXXXXXX — opcional
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=  # código de verificación de Search Console
```

Todas son `NEXT_PUBLIC_` porque se usan en componentes cliente / metadata
pública — no exponen ningún secreto.
