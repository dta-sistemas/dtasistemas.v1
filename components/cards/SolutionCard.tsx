import { useTranslations } from "next-intl";
import { LucideIcon, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type SolutionCardProps = {
  number: string; // "01"
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
  href: string;
};

/**
 * Card usada en los pilares de la Home y en /soluciones.
 * Fuente de datos: data/solutions.ts (ver Fase 0, sección 6.1).
 *
 * Mejoras: toda la tarjeta es clicable (enlace "estirado" con ::after, un solo
 * tab-stop para teclado), elevación + ícono que se llena de azul al hover, y el
 * texto del enlace viene de i18n (antes "Ver soluciones" estaba fijo en español).
 */
export function SolutionCard({ number, icon: Icon, title, description, bullets, href }: SolutionCardProps) {
  const tc = useTranslations("common");

  return (
    <article className="group relative flex h-full flex-col rounded-card border border-dta-gray-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-dta-blue-600/40 hover:shadow-card-hover">
      <div className="flex items-start justify-between">
        <div
          className="grid h-12 w-12 place-items-center rounded-xl bg-dta-blue-100 text-dta-blue-600 transition-colors duration-300 group-hover:bg-dta-blue-600 group-hover:text-white"
          aria-hidden="true"
        >
          <Icon size={22} />
        </div>
        <span className="text-sm font-semibold tabular-nums text-dta-gray-400" aria-hidden="true">
          {number}
        </span>
      </div>

      <h3 className="mt-5 text-h3 text-dta-black">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-dta-gray-600">{description}</p>

      <ul className="mt-5 space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-dta-gray-700">
            <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-dta-blue-600" aria-hidden="true" /> {b}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-dta-blue-600 after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-dta-blue-600"
        >
          {tc("verSoluciones")}
          <span className="sr-only">: {title}</span>
          <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
