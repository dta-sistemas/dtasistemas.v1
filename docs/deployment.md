# Deployment — DTA Sistemas

Guía de despliegue: Cloudflare (DNS/seguridad/red) + Vercel (frontend/web),
tal como define el stack de Fase 0, sección 06, y el roadmap de Fase 0,
Fase 10.

---

## 1. Entornos

| Entorno | Dónde vive | Cómo se activa | Dominio |
|---|---|---|---|
| **Development** | Local, cada máquina de desarrollo | `npm run dev` | `localhost:3000` |
| **Staging / Preview** | Vercel Preview Deployments | Automático en cada Pull Request | `dta-sistemas-git-[branch].vercel.app` (o un subdominio propio, ver 4.3) |
| **Production** | Vercel Production | Automático al hacer merge a `main` | Dominio final (pendiente de confirmar, Fase 0 punto 11.5) |

No se crea infraestructura separada por entorno (no hay "otro servidor" para
staging) — Vercel genera automáticamente una URL de Preview por cada PR
abierto, con su propio build, sin tocar producción. Esto cumple el pedido de
Fase 0 ("development, staging, production cuando sea viable") sin
sobre-construir infraestructura que el proyecto no necesita en esta etapa.

---

## 2. Vercel — configuración del proyecto

### 2.1 Conexión inicial

1. Importar el repositorio de GitHub en Vercel (New Project → seleccionar
   el repo → Vercel detecta Next.js automáticamente).
2. Framework Preset: **Next.js** (autodetectado, no tocar).
3. Build Command / Output Directory: dejar los defaults de Next.js.
4. Root Directory: `/` (raíz del repo, asumiendo que el proyecto no vive en
   un subdirectorio de un monorepo).

### 2.2 Variables de entorno por ambiente

Vercel permite (y es la práctica correcta) configurar variables distintas
para **Production**, **Preview** y **Development** desde Project Settings →
Environment Variables. Usar `.env.example` (raíz del repo) como checklist de
qué variables existen — nunca comitear los valores reales.

Recomendación concreta por variable:

| Variable | Production | Preview | Notas |
|---|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Sitio real de Turnstile | Sitio de **testing** de Turnstile (Cloudflare ofrece site keys de prueba que siempre pasan/fallan) | Evita gastar cuota real de Turnstile en cada preview de PR |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Propiedad GA4 real | **Vacía** o una propiedad GA4 separada de pruebas | No contaminar los datos de producción con tráfico de previews |
| `NEXT_PUBLIC_GTM_CONTAINER_ID` | Contenedor real | Vacía | Mismo motivo |
| `EMAIL_PROVIDER_API_KEY` / `CRM_API_KEY` | Reales | **Vacías** (los stubs de `lib/leads/` ya hacen `console.warn` sin romper el flujo si faltan, ver Fase 7) | Evita que un lead de prueba en un preview le llegue al equipo comercial |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Real | Vacía | Solo aplica a producción |

### 2.3 Preview Deployments (staging funcional)

Cada Pull Request obtiene automáticamente:
- Su propia URL pública (`https://dta-sistemas-git-[branch]-[team].vercel.app`).
- Su propio build, aislado de producción.
- Comentario automático de Vercel en el PR de GitHub con el link.

Esto es el "staging" del proyecto: se revisa visualmente ahí antes de hacer
merge a `main`. No requiere configuración adicional una vez conectado el
repo.

### 2.4 Rollback

Vercel conserva el historial de deployments de producción. Si un deploy
introduce un problema, "Promote to Production" sobre un deployment anterior
revierte en segundos, sin necesidad de un revert de Git urgente.

---

## 3. Cloudflare — DNS, seguridad y red

### 3.1 DNS

1. Agregar el dominio a Cloudflare (cambiar los nameservers en el
   registrador al par que Cloudflare asigna).
2. Crear un registro `CNAME` (o `A`, según lo que Vercel indique en su
   panel de dominios) apuntando el dominio raíz y/o `www` a Vercel.
3. **Proxy status: Proxied (nube naranja)** — así Cloudflare puede aplicar
   WAF, caché y Turnstile; si se deja "DNS only" (nube gris), Cloudflare
   solo resuelve DNS y no protege nada.

### 3.2 SSL/TLS

- Modo: **Full (strict)** — Cloudflare exige un certificado válido también
  en el origen (Vercel ya provee uno automáticamente vía Let's Encrypt),
  evitando que el tramo Cloudflare↔Vercel quede sin cifrar.
- **Always Use HTTPS**: activado.
- **Automatic HTTPS Rewrites**: activado (evita mixed content si algún
  recurso quedara referenciado por `http://` por error).

### 3.3 Dominio y subdominios

- Dominio raíz → producción.
- `staging.[dominio]` (opcional): si en el futuro se prefiere una URL de
  staging estable en vez de las URLs de Preview generadas por PR, se puede
  crear un registro apuntando a un branch fijo de Vercel (ej. `staging`) en
  vez de a producción. No es necesario para el flujo actual de PRs.

### 3.4 WAF y reglas básicas

- Activar el **WAF gestionado** de Cloudflare (reglas por defecto) — cubre
  patrones de ataque comunes sin configuración manual.
- Regla de **rate limiting a nivel de Cloudflare** sobre `/contacto` como
  capa adicional a la ya implementada en código (`lib/security/rateLimit.ts`,
  ver sección de seguridad más abajo) — Cloudflare puede limitar por IP
  antes de que la request siquiera llegue a Vercel, más robusto que el
  rate limit en memoria del lado de la aplicación.

### 3.5 Caché

- **Cache Level: Standard** — respeta los headers `Cache-Control` que
  Vercel/Next.js ya configuran automáticamente para assets estáticos
  (`_next/static/*`) e imágenes optimizadas. No forzar un nivel de caché
  más agresivo a nivel de Cloudflare: duplicaría lo que Next.js ya resuelve
  bien y podría servir contenido desactualizado si se cachea HTML dinámico
  por error.
- No es necesario configurar Page Rules de caché personalizadas para esta
  fase — el comportamiento por defecto es correcto.

### 3.6 Cloudflare Turnstile

Ya cubierto operativamente en Fase 7 (`components/forms/TurnstileWidget.tsx`,
`lib/leads/verifyTurnstile.ts`). Pasos pendientes de ejecutar en el
dashboard: Cloudflare → Turnstile → Add Site → copiar Site Key y Secret Key
a las variables de entorno correspondientes (ver sección 2.2).

---

## 4. Seguridad implementada en código (Fase 10)

| Protección | Dónde vive | Detalle |
|---|---|---|
| Headers de seguridad | `next.config.mjs` → `headers()` | CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy — aplican a todas las rutas automáticamente, Vercel los respeta sin configuración adicional |
| Rate limiting del formulario | `lib/security/rateLimit.ts`, usado en `lib/leads/submitLead.ts` | Máximo 5 envíos por IP por minuto. **Limitación documentada**: en memoria, no perfectamente consistente entre instancias serverless — ver comentario en el archivo para la ruta de migración a Upstash Redis |
| Validación server-side | `lib/validation/contactSchema.ts` (Fase 7) | Ya implementado — nunca se confía solo en la validación del cliente |
| Anti-spam | Cloudflare Turnstile (Fase 7) | Verificado server-side, no solo presente en el DOM |
| Variables de entorno | `.env.example` (nunca `.env` real comiteado) | `.gitignore` ya excluye todos los `.env*.local` |
| Secretos nunca expuestos al cliente | Convención `NEXT_PUBLIC_*` vs. server-only | Auditado: `TURNSTILE_SECRET_KEY`, `EMAIL_PROVIDER_API_KEY`, `CRM_API_KEY` nunca se leen desde componentes cliente |

### CSP — qué permite y por qué

La Content-Security-Policy en `next.config.mjs` permite explícitamente solo
los orígenes que el sitio realmente usa:
`googletagmanager.com` y `google-analytics.com` (Fase 8, GA4/GTM),
`challenges.cloudflare.com` (Fase 7, Turnstile). Todo lo demás queda
bloqueado por defecto (`default-src 'self'`), incluyendo cualquier script,
iframe o conexión hacia un dominio no autorizado — el vector de XSS más
común (inyectar un `<script src="...">` desde un CDN de terceros no
aprobado) queda cerrado. La única concesión pragmática es `'unsafe-inline'`
en `script-src`/`style-src`, necesaria porque Next.js inyecta scripts
inline pequeños para la hidratación; el comentario en `next.config.mjs`
documenta la ruta de endurecimiento futura (CSP basada en nonces).

---

## 5. Checklist de salida a producción

- [ ] Variables de entorno de producción configuradas en Vercel (ver 2.2)
- [ ] Dominio conectado en Cloudflare con SSL Full (strict) y proxy activado
- [ ] Turnstile con site/secret key reales (no las de testing)
- [ ] GA4 y Search Console verificados apuntando al dominio final
- [ ] `lib/site.ts` actualizado con el dominio final (ver Fase 9 — es la
      única fuente que hay que tocar)
- [ ] Confirmar que `robots.ts`/`sitemap.ts` responden correctamente en el
      dominio real antes de enviar el sitemap a Search Console
- [ ] Ejecutar Lighthouse/PageSpeed Insights contra la URL de producción
      real (pendiente desde Fase 9, ahora sí es posible)
