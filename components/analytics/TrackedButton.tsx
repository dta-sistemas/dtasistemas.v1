"use client";

import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { analytics } from "@/lib/analytics/events";
import { buttonClasses, arrowClasses, type ButtonVariant } from "../ui/buttonStyles";

type TrackedButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  showArrow?: boolean;
  className?: string;
  /** Identifica el CTA en el evento cta_click, ej. "analizar-mi-empresa". */
  trackLabel: string;
  /** Identifica dónde vive el CTA, ej. "hero", "final-cta", "digital-audit-page". */
  trackSource: string;
};

/**
 * Igual que components/ui/Button.tsx en variante "href", pero dispara
 * `cta_click` (Fase 0, sección 19) antes de navegar. Se usa solo en los
 * CTAs de mayor valor de conversión (Hero, CTA final, Digital Audit, DTA
 * Care) para no convertir cada botón del sitio en Client Component — el
 * resto puede seguir usando el <Button> normal.
 *
 * onClick no bloquea la navegación: <Link> sigue resolviendo el href con
 * normalidad, el evento solo se registra como efecto secundario del clic.
 * Los estilos vienen de ../ui/buttonStyles (compartidos con <Button>).
 */
export function TrackedButton({
  href,
  children,
  variant = "primary",
  showArrow = true,
  className = "",
  trackLabel,
  trackSource,
}: TrackedButtonProps) {
  return (
    <Link
      href={href}
      onClick={() => analytics.ctaClick(trackLabel, trackSource)}
      className={buttonClasses(variant, className)}
    >
      {children}
      {showArrow && <ArrowRight size={16} className={arrowClasses} aria-hidden="true" />}
    </Link>
  );
}
