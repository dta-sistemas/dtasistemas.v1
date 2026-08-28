import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Contenedor de ancho máximo estándar (1280px) con padding responsive.
 * Usar en cada Section como wrapper del contenido.
 */
export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`dta-container ${className}`}>{children}</div>;
}
