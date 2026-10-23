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
  subtle: "bg-dta-gray-50", // alternancia de fondo en Homepage
  transparent: "bg-transparent",
};

/**
 * Wrapper estándar de sección de página. Controla el fondo (tono)
 * y el espaciado vertical consistente entre secciones.
 *
 * Regla de marca: tone="dark" en máximo 1-2 secciones por página
 * (ver Design System, Fase 0 sección 5.1).
 *
 * `data-tone` permite que los estilos globales ajusten el foco de teclado
 * (azul claro, visible) dentro de secciones navy.
 */
export function Section({ children, tone = "transparent", className = "", id }: SectionProps) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={`py-14 md:py-section-y ${toneStyles[tone]} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
