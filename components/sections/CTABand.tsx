import type { ReactNode } from "react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";

type CTABandProps = {
  title: string;
  text?: string;
  href: string;
  label: ReactNode;
};

/** Cierre de las páginas de detalle: titular, una acción. Claro, para no apilar azul marino con el footer. */
export function CTABand({ title, text, href, label }: CTABandProps) {
  return (
    <Section tone="light">
      <div className="max-w-2xl border-t border-dta-black pt-10">
        <h2 className="text-h2 text-dta-black">{title}</h2>
        {text && <p className="mt-3 max-w-xl text-body-lg text-dta-gray-600">{text}</p>}
        <div className="mt-7">
          <Button href={href} variant="primary">
            {label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
