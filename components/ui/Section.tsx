import { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  children: ReactNode;
  tone?: "light" | "dark" | "subtle" | "transparent";
  className?: string;
  id?: string;
};

const toneStyles = {
  light: "bg-white",
  dark: "bg-dta-navy-900 text-white",
  subtle: "bg-dta-gray-50", // NUEVO en Fase 2: alternancia de fondo en Homepage
  transparent: "bg-transparent",
};

/**
 * Wrapper estándar de sección de página. Controla el fondo (tono)
 * y el espaciado vertical consistente entre secciones.
 *
 * Actualización Fase 2: se agrega tone="subtle" (gris off-white) para
 * alternar con tone="light" (blanco) en la Homepage, tal como en los
 * mockups aprobados. Reemplaza el Section.tsx entregado en Fase 1.
 *
 * Regla de marca: tone="dark" en máximo 1-2 secciones por página
 * (ver Design System, Fase 0 sección 5.1).
 */
export function Section({ children, tone = "transparent", className = "", id }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-section-y ${toneStyles[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
