import { LucideIcon, CheckCircle2, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { IconCircle } from "../ui/Badge";

type SolutionCardProps = {
  number: string; // "01"
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
  href: string;
};

/**
 * Card usada en los 5 (o 6, incl. DTA Care) pilares de la Home y en /soluciones.
 * Fuente de datos: data/solutions/solutions.ts (ver Fase 0, sección 6.1).
 */
export function SolutionCard({ number, icon, title, description, bullets, href }: SolutionCardProps) {
  return (
    <div className="rounded-card border border-dta-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
      <IconCircle icon={icon} />
      <div className="text-sm font-semibold text-dta-gray-600 mt-4">{number}</div>
      <div className="text-h3 text-dta-black mt-1">{title}</div>
      <p className="text-sm text-dta-gray-600 mt-2 leading-relaxed">{description}</p>
      <ul className="mt-4 space-y-1.5">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-sm text-dta-black/80">
            <CheckCircle2 size={14} className="text-dta-blue-600 shrink-0" /> {b}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-dta-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
      >
        Ver soluciones <ChevronRight size={14} />
      </Link>
    </div>
  );
}
