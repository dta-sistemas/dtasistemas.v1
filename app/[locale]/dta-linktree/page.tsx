import type { Metadata } from "next";
import { LinktreeView } from "./LinktreeView";

/**
 * /dta-linktree — página tipo "link in bio" para compartir desde redes
 * sociales (bio de Instagram, WhatsApp, etc.). Requisitos explícitos del
 * cliente:
 *
 * 1. Solo versión móvil — no es una vista responsive del sitio, es un
 *    diseño standalone pensado para abrirse desde el teléfono.
 * 2. NO se enlista en ningún menú, footer, ni sección del sitio — es
 *    intencionalmente una URL "no listada", solo accesible compartiendo el
 *    link directo. Por eso NO aparece en data/navigation.ts, ni en
 *    app/sitemap.ts, y lleva `robots: noindex` (no debe indexarse ni
 *    aparecer en resultados de búsqueda — es contenido de campaña, no de SEO).
 *
 * Vive en app/dta-linktree/ (fuera de los route groups (marketing) y
 * (product)) para NO heredar el Navbar/Footer del sitio — ver
 * app/layout.tsx (Fase 12) y su comentario sobre esta reestructuración.
 */
export const metadata: Metadata = {
  title: "DTA Sistemas",
  description: "Tecnología para entender, automatizar y hacer crecer tu empresa.",
  robots: { index: false, follow: false },
};

export default function DTALinktreePage() {
  return <LinktreeView />;
}
