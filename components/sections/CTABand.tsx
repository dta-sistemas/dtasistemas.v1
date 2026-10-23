import type { ReactNode } from "react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";

type CTABandProps = {
  title: string;
  text?: string;
  href: string;
  label: ReactNode;
};

/**
 * Franja oscura de cierre de las páginas de detalle. Reemplaza 5 copias del
 * mismo bloque que además sobrescribían los colores del botón con clases
 * sueltas; ahora usa la variante "light" del sistema de botones.
 */
export function CTABand({ title, text, href, label }: CTABandProps) {
  return (
    <Section tone="dark" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-grid-navy absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-56 w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-dta-blue-600/35 blur-[100px]"
      />
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-h2 text-white">{title}</h2>
        {text && <p className="mt-3 text-body-lg text-white/70">{text}</p>}
        <div className="mt-7 flex justify-center">
          <Button href={href} variant="light">
            {label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
