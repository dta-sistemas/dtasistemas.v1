import type { ReactNode } from "react";
import { Container } from "../ui/Container";
import { Breadcrumb, type BreadcrumbItem } from "../navigation/Breadcrumb";

type PageHeroProps = {
  breadcrumb: BreadcrumbItem[];
  eyebrow?: string;
  /** Pasar el fragmento resaltado como <span className="text-dta-blue-600">…</span>. */
  title: ReactNode;
  description?: ReactNode;
  /** Botones / precio bajo la descripción. */
  actions?: ReactNode;
  /** Panel visual a la derecha en escritorio (debajo del texto en móvil). */
  aside?: ReactNode;
  /** Contenido extra bajo las acciones (ej. fecha y tiempo de lectura de un artículo). */
  meta?: ReactNode;
};

/**
 * Encabezado único de TODAS las páginas internas. Antes cada página repetía
 * el mismo bloque (Section + Breadcrumb + eyebrow + h1) con pequeñas
 * variaciones —incluido un h1 de 44px en móvil y 36px en escritorio—.
 * Ahora una sola pieza garantiza consistencia: fondo claro con cuadrícula
 * técnica difuminada y un resplandor azul suave, eyebrow con punto, h1 fluido
 * y un slot opcional (`aside`) para un panel visual.
 */
export function PageHero({ breadcrumb, eyebrow, title, description, actions, aside, meta }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-dta-gray-200 bg-dta-gray-50">
      <div
        aria-hidden="true"
        className="bg-grid-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_80%_0%,black_10%,transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-32 -z-10 h-80 w-80 rounded-full bg-dta-blue-600/10 blur-[110px]"
      />
      <Container className="py-10 md:py-14">
        <Breadcrumb items={breadcrumb} />
        <div className={aside ? "grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14" : ""}>
          <div className={aside ? "" : "max-w-2xl"}>
            {eyebrow && (
              <div className="mb-4 inline-flex items-center gap-2 text-label uppercase text-dta-blue-600">
                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                {eyebrow}
              </div>
            )}
            <h1 className="text-h1 text-dta-black">{title}</h1>
            {description && <p className="mt-4 max-w-xl text-body-lg text-dta-gray-600">{description}</p>}
            {actions && <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">{actions}</div>}
            {meta && <div className="mt-5">{meta}</div>}
          </div>
          {aside && <div>{aside}</div>}
        </div>
      </Container>
    </section>
  );
}

/** Panel navy reutilizable para el slot `aside` (ícono + título + lista). */
export function HeroPanel({ children }: { children: ReactNode }) {
  return (
    <div
      data-tone="dark"
      className="relative isolate overflow-hidden rounded-card bg-dta-navy-900 p-6 text-white shadow-card-hover md:p-8"
    >
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-dta-blue-600/30 blur-[80px]"
      />
      {children}
    </div>
  );
}
