import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Carousel } from "../ui/Carousel";

const ROWS = [
  { key: "manuales", href: "/soluciones/inteligencia-artificial" },
  { key: "informacion", href: "/soluciones/integracion-de-sistemas" },
  { key: "datos", href: "/soluciones/business-intelligence" },
  { key: "sistema", href: "/soluciones/sistemas-empresariales" },
] as const;

/**
 * Las frases que de verdad dicen los dueños de empresa, en primera persona. Compacto y
 * horizontal: en escritorio, las 4 en una sola fila; en el celular, un carrusel que se desliza
 * con el dedo (la siguiente tarjeta asoma) en lugar de 4 bloques apilados. Cada una lleva a la
 * solución que la resuelve.
 */
export function ProblemsSection() {
  const t = useTranslations("home");
  const tp = useTranslations("problems");
  const tc = useTranslations("common");

  return (
    <Section tone="light">
      <h2 className="max-w-2xl text-h2 text-dta-black">{t("problemsTitle")}</h2>
      <p className="mt-3 text-sm text-dta-gray-600 lg:hidden">{t("problemsLead")}</p>

      <div className="mt-8 lg:mt-12">
        <Carousel
          label={t("problemsTitle")}
          prevLabel={t("carouselPrev")}
          nextLabel={t("carouselNext")}
          itemClassName="basis-[78%] sm:basis-[46%]"
          gridAt="lg"
          dots
        >
          {ROWS.map((row, i) => (
            <Link
              key={row.key}
              href={row.href}
              className="group flex h-full min-h-[13rem] flex-col rounded-card border border-dta-gray-200 bg-white p-5 transition-colors duration-150 hover:border-dta-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dta-blue-600 lg:min-h-[15rem]"
            >
              <span className="flex items-center gap-2 font-mono text-xs text-dta-gray-600">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-[2px] bg-dta-blue-600" />
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-4 flex-1 font-serif text-[1.35rem] leading-snug text-dta-black">{tp(`${row.key}.text`)}</span>
              <span className="mt-5 flex items-center justify-between text-sm font-semibold text-dta-blue-600">
                {tp(`${row.key}.link`)}
                <span className="grid h-8 w-8 place-items-center rounded-full border border-dta-gray-200 transition-colors group-hover:border-dta-blue-600 group-hover:bg-dta-blue-600 group-hover:text-white">
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </span>
            </Link>
          ))}
        </Carousel>
      </div>

      <div className="mt-8 lg:mt-10">
        <Button href="/soluciones" variant="primary">
          {tc("encontrarOportunidades")}
        </Button>
      </div>
    </Section>
  );
}
