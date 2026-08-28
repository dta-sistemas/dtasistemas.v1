"use client";

import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { analytics } from "@/lib/analytics/events";

type Variant = "primary" | "secondary" | "dark";

type TrackedButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  showArrow?: boolean;
  className?: string;
  /** Identifica el CTA en el evento cta_click, ej. "analizar-mi-empresa". */
  trackLabel: string;
  /** Identifica dónde vive el CTA, ej. "hero", "final-cta", "digital-audit-page". */
  trackSource: string;
};

const variantStyles: Record<Variant, string> = {
  primary: "bg-dta-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-white text-dta-black border border-dta-gray-200 hover:border-dta-black",
  dark: "bg-dta-navy-900 text-white hover:bg-dta-navy-800",
};

const base =
  "inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600";

/**
 * Igual que components/ui/Button.tsx en variante "href", pero dispara
 * `cta_click` (Fase 0, sección 19) antes de navegar. Se usa solo en los
 * CTAs de mayor valor de conversión (Hero, CTA final, Digital Audit, DTA
 * Care) para no convertir cada botón del sitio en Client Component — el
 * resto puede seguir usando el <Button> normal.
 *
 * onClick no bloquea la navegación: <Link> sigue resolviendo el href con
 * normalidad, el evento solo se registra como efecto secundario del clic.
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
      className={`${base} ${variantStyles[variant]} ${className}`}
    >
      {children}
      {showArrow && <ArrowRight size={16} aria-hidden="true" />}
    </Link>
  );
}
