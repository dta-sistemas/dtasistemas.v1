import type { Metadata } from "next";
import { LayoutDashboard } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

/**
 * /dashboard — reservado (Fase 0, sección 43). Cuando exista autenticación
 * real, esta ruta debe protegerse en middleware.ts (ver el stub ya
 * preparado en la raíz del proyecto) redirigiendo a /login si no hay
 * sesión. Hoy no hay sesión que verificar, así que no se implementa el
 * guard todavía — solo se deja documentado dónde debe vivir.
 */
export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardPlaceholderPage() {
  return (
    <Section tone="subtle" className="min-h-[70vh] flex items-center">
      <div className="max-w-md mx-auto text-center">
        <div className="w-14 h-14 rounded-full bg-dta-blue-100 text-dta-blue-600 flex items-center justify-center mx-auto mb-4">
          <LayoutDashboard size={24} aria-hidden="true" />
        </div>
        <h1 className="text-h2 text-dta-black">Dashboard en construcción.</h1>
        <p className="text-dta-gray-600 mt-3">
          Aquí vivirán en el futuro tus resultados de DTA Audit, el estado de tus sistemas y tus
          reportes de DTA Intelligence.
        </p>
        <div className="mt-6">
          <Button href="/" variant="secondary">
            Volver al inicio
          </Button>
        </div>
      </div>
    </Section>
  );
}
