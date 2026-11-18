import { MapPin } from "lucide-react";
import { Section } from "../ui/Section";

const PLACES = ["Cancún", "Playa del Carmen", "Riviera Maya", "Quintana Roo", "Yucatán"];

type LocationStripProps = {
  headline?: string;
  /** Texto de la barra superior, ej. "dta/ubicacion". */
  module?: string;
};

/**
 * Dónde trabajamos: titular en serif y las zonas como etiquetas técnicas, dentro de un módulo
 * claro (el azul marino se reserva para la misión y el cierre, para no apilar bloques oscuros).
 */
export function LocationStrip({
  headline = "Tecnología construida desde el corazón de uno de los mercados más dinámicos de México.",
  module = "dta/ubicacion",
}: LocationStripProps) {
  return (
    <Section tone="light" className="!pt-0 md:!pt-0">
      <div className="overflow-hidden rounded-card border border-dta-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-white/10 bg-dta-navy-800 px-5 py-2.5 font-mono text-xs text-white/55">
          <span>{module}</span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dta-blue-300 ring-4 ring-dta-blue-300/20" />
        </div>
        <div className="grid items-center gap-8 p-6 md:grid-cols-12 md:gap-12 md:p-10">
          <h2 className="text-h2 text-dta-black md:col-span-7">{headline}</h2>
          <ul className="flex flex-wrap gap-2 md:col-span-5">
            {PLACES.map((p) => (
              <li key={p} className="flex items-center gap-1.5 rounded border border-dta-gray-300 bg-dta-gray-50 px-2.5 py-1.5 font-mono text-xs text-dta-gray-700">
                <MapPin size={13} className="text-dta-blue-600" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
