import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/**
 * Layout del route group (marketing) — aquí viven Navbar y Footer,
 * movidos desde app/layout.tsx en Fase 12. Todas las rutas ya construidas
 * en Fases 2-9 (Home, /soluciones, /sectores, /proyectos, /dta, /dta-care,
 * /blog, /contacto, /design-system) ya vivían dentro de este route group
 * desde su creación, así que siguen viéndose exactamente igual — este
 * cambio es invisible para ellas.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
