import type { ReactNode } from "react";

type SystemWindowProps = {
  /** Texto del encabezado, en monoespaciada (ej. "dta · sincronización"). */
  title?: string;
  /** Texto a la derecha del encabezado, junto al punto azul de "conectado". */
  status?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Marco de "pantalla de sistema" sobre fondos navy: barra de título en mono y un punto
 * azul de estado (azul = conectado). Es el contenedor de todas las demostraciones técnicas
 * del sitio (consola del Hero, paneles laterales de las páginas internas).
 */
export function SystemWindow({ title = "dta", status, children, className = "" }: SystemWindowProps) {
  return (
    <div
      data-tone="dark"
      className={`overflow-hidden rounded-card border border-white/10 bg-dta-navy-800 text-white ${className}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-2.5 font-mono text-xs text-white/55">
        <span className="truncate">{title}</span>
        <span className="flex shrink-0 items-center gap-2">
          {status}
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dta-blue-600 ring-4 ring-dta-blue-600/25" />
        </span>
      </div>
      {children}
    </div>
  );
}
