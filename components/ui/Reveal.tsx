import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Sin uso: se conserva por compatibilidad con las páginas que aún envuelven contenido. */
  delay?: number;
};

/**
 * Antes animaba la aparición de cada bloque al hacer scroll. Se retiró a propósito:
 * el movimiento se reserva para UN momento (la conciliación del Hero) y el resto del
 * sitio permanece quieto. Se deja como envoltorio neutro para no tocar cada página;
 * puede eliminarse por completo en una limpieza posterior.
 */
export function Reveal({ children, className = "" }: RevealProps) {
  return <div className={className}>{children}</div>;
}
