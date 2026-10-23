import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";

/**
 * Layout del route group (marketing) — aquí viven Navbar y Footer,
 * movidos desde app/layout.tsx en Fase 12. Se agrega SkipLink + id="contenido"
 * en <main> (accesibilidad por teclado).
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="contenido" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
