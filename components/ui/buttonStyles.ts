/**
 * Fuente única de estilos de botón. Antes `Button.tsx` y
 * `analytics/TrackedButton.tsx` duplicaban estas clases (y los hover usaban
 * `blue-700` de Tailwind, fuera de la paleta). Cualquier ajuste visual de los
 * botones se hace SOLO aquí.
 */
export type ButtonVariant = "primary" | "secondary" | "dark" | "light" | "ghost-light";

const variantStyles: Record<ButtonVariant, string> = {
  // CTA principal — uno por vista.
  primary:
    "bg-dta-blue-600 text-white shadow-sm hover:bg-dta-blue-700 hover:shadow-md active:bg-dta-blue-700",
  // CTA de apoyo sobre fondos claros.
  secondary:
    "bg-white text-dta-black border border-dta-gray-200 hover:border-dta-black hover:bg-dta-gray-50",
  // Más peso visual que "secondary" sobre fondos claros.
  dark: "bg-dta-navy-900 text-white hover:bg-dta-navy-800",
  // Botón blanco sobre fondos navy (ej. CTA final).
  light:
    "bg-white text-dta-navy-900 hover:bg-dta-gray-100 focus-visible:outline-white",
  // Botón de contorno sobre fondos navy (CTA secundario del Hero, DTA Care).
  "ghost-light":
    "bg-white/5 text-white border border-white/25 hover:bg-white/10 hover:border-white/50 focus-visible:outline-white",
};

const base =
  "group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold " +
  "transition-all duration-200 active:scale-[0.98] " +
  "disabled:opacity-50 disabled:pointer-events-none " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dta-blue-600";

export function buttonClasses(variant: ButtonVariant = "primary", className = ""): string {
  return `${base} ${variantStyles[variant]} ${className}`.trim();
}

/** La flecha se desplaza al pasar el cursor: señal de "esto avanza". */
export const arrowClasses = "transition-transform duration-200 group-hover:translate-x-0.5";
