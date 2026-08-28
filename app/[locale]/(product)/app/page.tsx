import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { futureProducts } from "@/data/futureProducts";

/**
 * /app — Fase 0, sección 43 y 11: ruta reservada para la futura DTA
 * Platform. NO tiene funcionalidad real — es un placeholder que documenta
 * la intención y evita que otro equipo tenga que negociar esta URL después.
 * noindex: no es contenido de marketing/SEO, y todavía no es un producto real.
 */
export const metadata: Metadata = {
  title: "DTA Platform",
  description: "Próximamente: la plataforma de productos digitales de DTA Sistemas.",
  robots: { index: false, follow: false },
};

export default function ProductPlatformPage() {
  return (
    <Section tone="subtle" className="min-h-[70vh] flex items-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-label uppercase text-dta-blue-600 mb-3">DTA Platform</div>
        <h1 className="text-display-sm text-dta-black">
          Los productos digitales de DTA, <span className="text-dta-blue-600">en construcción.</span>
        </h1>
        <p className="text-dta-gray-600 mt-4">
          Esta es la base sobre la que construiremos herramientas propias de DTA. Hoy no hay
          nada que iniciar sesión todavía — mientras tanto, seguimos trabajando con empresas de
          forma directa.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mt-10 text-left">
          {futureProducts.map((p) => (
            <div key={p.slug} className="rounded-card border border-dta-gray-200 bg-white p-5">
              <p.icon size={20} className="text-dta-blue-600 mb-3" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <div className="font-bold text-dta-black text-sm">{p.name}</div>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-dta-gray-600 bg-dta-gray-50 border border-dta-gray-200 rounded-full px-2 py-0.5">
                  Próximamente
                </span>
              </div>
              <p className="text-sm text-dta-gray-600 mt-2">{p.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button href="/contacto" variant="primary">
            Hablar con DTA
          </Button>
        </div>
      </div>
    </Section>
  );
}
