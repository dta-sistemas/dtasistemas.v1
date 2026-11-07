import type { ReactNode } from "react";
import { Container } from "../ui/Container";
import { Breadcrumb, type BreadcrumbItem } from "../navigation/Breadcrumb";
import { SystemWindow } from "../ui/SystemWindow";

type PageHeroProps = {
  breadcrumb: BreadcrumbItem[];
  /** Sin uso: un eyebrow sobre el título es redundante con el breadcrumb y con el propio título. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Botones / precio bajo la descripción. */
  actions?: ReactNode;
  /** Panel de sistema a la derecha en escritorio (debajo del texto en móvil). Usar <HeroPanel>. */
  aside?: ReactNode;
  /** Contenido extra bajo las acciones (ej. fecha y tiempo de lectura de un artículo). */
  meta?: ReactNode;
};

/**
 * Encabezado único de todas las páginas internas, ahora azul marino para que el sitio se
 * sienta como un producto técnico de principio a fin: titular serif blanco y, cuando
 * aplica, un panel de sistema (`aside`) que muestra el tipo de sistema de la página.
 */
export function PageHero({ breadcrumb, title, description, actions, aside, meta }: PageHeroProps) {
  return (
    <section data-tone="dark" className="bg-dta-navy-900 text-white">
      <Container className="py-10 md:py-16">
        <Breadcrumb items={breadcrumb} tone="dark" />
        <div className={aside ? "grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14" : ""}>
          <div className={aside ? "" : "max-w-2xl"}>
            <h1 className="text-h1 text-white">{title}</h1>
            {description && <p className="mt-4 max-w-xl text-body-lg text-white/70">{description}</p>}
            {actions && <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">{actions}</div>}
            {meta && <div className="mt-5 text-white/65">{meta}</div>}
          </div>
          {aside && <div>{aside}</div>}
        </div>
      </Container>
    </section>
  );
}

/** Panel de sistema para el slot `aside` del PageHero. */
export function HeroPanel({ children, title = "dta" }: { children: ReactNode; title?: string }) {
  return (
    <SystemWindow title={title}>
      <div className="p-6 md:p-7">{children}</div>
    </SystemWindow>
  );
}
