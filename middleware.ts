import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Middleware de enrutamiento por idioma (Fase 13, reemplaza el middleware
 * no-op de Fase 11). next-intl resuelve automáticamente:
 * - "/" y "/soluciones" → locale "es" (sin prefijo, defaultLocale)
 * - "/en" y "/en/soluciones" → locale "en"
 *
 * El área de producto reservada (Fase 11: /app, /login, /dashboard) y
 * /dta-linktree (Fase 12) ahora también viven bajo [locale] — este
 * middleware las cubre igual que el resto del sitio. El guard de
 * autenticación futuro para /dashboard (documentado en Fase 11) se
 * agregaría aquí encadenado después de intlMiddleware cuando exista sesión
 * real; hoy sigue sin implementarse a propósito.
 */
export default createMiddleware(routing);

export const config = {
  // Excluye archivos estáticos, _next, y las rutas especiales que deben
  // seguir siendo locale-invariantes (robots.txt, sitemap.xml).
  matcher: ["/((?!api|_next|_vercel|robots.txt|sitemap.xml|.*\\..*).*)"],
};
