import { MapPin } from "lucide-react";
import { Section } from "../ui/Section";

const PLACES = ["Cancún", "Playa del Carmen", "Riviera Maya", "Quintana Roo", "Yucatán"];

type LocationStripProps = {
  headline?: string;
};

/**
 * Franja de ubicación sobre fondo navy — comunica "construimos desde
 * Quintana Roo para empresas de México y otros mercados" (Fase 0, sección 02)
 * sin construirse como página doorway. Reutilizable en /dta y, si se
 * necesita, en otras páginas de sector/contacto.
 */
export function LocationStrip({
  headline = "Tecnología construida desde el corazón de uno de los mercados más dinámicos de México.",
}: LocationStripProps) {
  return (
    <Section tone="dark">
      <div className="max-w-md">
        <h2 className="text-h3 md:text-h2">{headline}</h2>
        <div className="flex flex-wrap gap-5 text-sm text-white/80 mt-6">
          {PLACES.map((p) => (
            <span key={p} className="flex items-center gap-1.5">
              <MapPin size={14} /> {p}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
