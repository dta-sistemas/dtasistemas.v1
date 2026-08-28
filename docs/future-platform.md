# Future Platform Architecture — Fase 11

Documenta la preparación hecha para que DTA pueda evolucionar de sitio
corporativo a plataforma de productos propios sin reconstruir desde cero
(Fase 0, sección 43 y objetivo general del proyecto).

**Regla seguida en esta fase, literal del brief:** *"NO desarrollar todavía
el SaaS. Pero dejar preparada la arquitectura."* Todo lo entregado aquí es
reserva de espacio y documentación — cero lógica de negocio de producto
real.

---

## 1. Qué se reservó

```
app/(product)/
  app/page.tsx          → /app — landing placeholder de la plataforma
  login/page.tsx         → /login — shell visual, sin autenticación real
  dashboard/page.tsx      → /dashboard — placeholder, sin datos reales

middleware.ts            → matcher ya apunta a /app, /login, /dashboard;
                            función no-op, con el patrón de auth guard
                            futuro documentado en el propio archivo

data/futureProducts.ts   → catálogo de los 5 productos futuros (nombre,
                            descripción, ícono) — alimenta /app

app/robots.ts             → actualizado: /app, /login, /dashboard en disallow
```

Estas rutas ya existen y son visitables (para que nadie más las use por
error), pero:

- No indexan (`robots: { index: false, follow: false }` en cada página +
  `disallow` en `robots.txt`).
- No aparecen en `app/sitemap.ts` (que solo enumera contenido de
  marketing — nunca se tocó para incluir el área de producto).
- No tienen lógica de autenticación, base de datos, ni estado real.

## 2. Por qué un route group `(product)` separado

`(product)` es un *route group* de Next.js — no afecta la URL (`/app` sigue
siendo `/app`, no `/product/app`), pero permite que en el futuro esta rama
del árbol de rutas tenga su propio layout, sus propios componentes de UI
(dashboard, sidebar, tablas) y eventualmente su propio `layout.tsx` con
autenticación, sin mezclar código con `(marketing)`.

**Decisión pragmática de esta fase:** las 3 páginas placeholder siguen
usando el layout raíz compartido (con Navbar/Footer de marketing) en vez de
un layout completamente distinto — porque construir un segundo "root
layout" real (sin Navbar/Footer de marketing, con su propia identidad
visual de producto) es trabajo de diseño y arquitectura que corresponde al
día en que el SaaS se construya de verdad, no a esta fase de reserva. Hacerlo
ahora sería adelantar decisiones de producto que todavía no existen.

## 3. Productos futuros contemplados

| Producto | Qué sería |
|---|---|
| **DTA Audit** | Versión productizada y autoservicio de DTA Digital Audit (hoy es un servicio manual, ver `/soluciones/dta-digital-audit`) |
| **DTA Digital Score** | Puntaje de madurez digital calculado automáticamente |
| **DTA Intelligence** | Dashboards conectados directo a las fuentes de datos del cliente |
| **DTA Monitoring** | Monitoreo continuo de sistemas que DTA construye/mantiene (evolución natural de DTA Care, `/dta-care`) |
| **DTA Automation** | Constructor de automatizaciones propio, sin depender de un proyecto a la medida por cada cambio |

Ninguno tiene especificación funcional todavía — están documentados aquí
únicamente para que el nombre y la intención no se pierdan entre fases.

## 4. Ruta de implementación futura (no se ejecuta en esta fase)

Cuando se decida construir la plataforma real:

1. **Autenticación**: el stack de Fase 0 ya contempla PostgreSQL + Prisma
   como backend futuro. Opciones razonables: NextAuth.js/Auth.js (más
   simple de integrar con Next.js App Router) o Clerk (gestionado, menos
   código propio). La decisión se toma en ese momento, no ahora — no hay
   suficiente información de requisitos (SSO corporativo, roles, etc.) para
   decidir hoy sin adivinar.
2. **`middleware.ts`**: reemplazar el cuerpo no-op por la verificación de
   sesión real — el `matcher` y el comentario con el patrón exacto ya están
   en el archivo (ver Fase 11, sección "Qué se reservó").
3. **Modelo de datos**: `User`, `Account`, `Organization` (una empresa
   cliente puede tener varios usuarios) y un modelo por producto (ej.
   `AuditResult` para DTA Audit) — se define con el detalle real de cada
   producto cuando se construya, no como esquema Prisma especulativo hoy.
4. **`app/(product)/app/page.tsx`** deja de ser una landing estática y pasa
   a ser el selector de productos activos de la cuenta autenticada.
5. **Diseño**: el Design System (Fase 1) ya es la base — botones, cards,
   tokens de color/tipografía se reutilizan sin cambios; lo que se agrega
   es el vocabulario de componentes de producto (tablas de datos, gráficas,
   navegación lateral) que no existía en el sitio de marketing.

## 5. Qué NO se hizo en esta fase, a propósito

- No se instaló ningún paquete de autenticación.
- No se creó ningún esquema de Prisma ni conexión a base de datos.
- No se diseñó la UI real del dashboard (solo un placeholder que dice
  "en construcción").
- No se tomó ninguna decisión de negocio sobre precios o alcance de cada
  producto futuro.

Construir cualquiera de estos ahora sería adivinar requisitos que todavía
no existen — exactamente lo que Fase 0, sección 53 ("No tomar decisiones
arbitrarias") pide evitar.
