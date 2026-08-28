import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
};

/** Pill pequeño usado para precios ("Desde $4,900 MXN") o etiquetas de estado. */
export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-dta-blue-100 text-dta-blue-600 text-xs font-semibold">
      {children}
    </span>
  );
}

type IconCircleProps = {
  icon: LucideIcon;
  tone?: "light" | "dark";
  size?: "sm" | "md";
};

/**
 * Círculo de ícono — elemento repetido en pilares, "Así trabajamos" y
 * canales de contacto. tone="dark" se usa sobre fondos navy.
 *
 * aria-hidden (hallazgo de la auditoría de Fase 9): el ícono siempre vive
 * junto a un texto que ya describe el contenido (título del pilar, label
 * del canal de contacto...), así que es puramente decorativo — sin
 * aria-hidden, algunos lectores de pantalla anuncian "imagen" o el nombre
 * del ícono SVG sin aportar información adicional.
 */
export function IconCircle({ icon: Icon, tone = "light", size = "md" }: IconCircleProps) {
  const dims = size === "sm" ? "w-9 h-9" : "w-11 h-11";
  const iconSize = size === "sm" ? 16 : 20;
  const colors =
    tone === "light" ? "bg-dta-blue-100 text-dta-blue-600" : "bg-white/10 text-white";

  return (
    <div className={`${dims} rounded-full flex items-center justify-center ${colors}`} aria-hidden="true">
      <Icon size={iconSize} />
    </div>
  );
}
