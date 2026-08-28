import { CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "../navigation/Breadcrumb";
import { JsonLd } from "../seo/JsonLd";
import { ViewTracker } from "../analytics/ViewTracker";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { getLocalizedSectors } from "@/lib/i18n/localizedContent";
import type { Solution } from "@/data/solutions";
import type { AppLocale } from "@/i18n/routing";

/**
 * Template compartido por las 6 páginas de /soluciones/[individual].
 * Fase 13: recibe `solution` ya localizado (resuelto por cada page.tsx vía
 * getLocalizedSolutionBySlug) + el locale, para poder traducir el resto
 * del layout (headings fijos, CTAs) vía next-intl.
 */
export async function SolutionDetail({ solution, locale }: { solution: Solution; locale: AppLocale }) {
  const t = await getTranslations({ locale, namespace: "solutionDetail" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const tHub = await getTranslations({ locale, namespace: "solucionesHub" });
  const sectors = getLocalizedSectors(locale);
  const related = sectors.filter((s) => solution.relatedSectors.includes(s.slug));

  return (
    <div>
      <ViewTracker event="solution_view" slug={solution.slug} />
      <JsonLd
        data={[
          buildServiceSchema({ name: solution.seo.metaTitle, description: solution.seo.metaDescription, url: solution.href, locale }),
          buildBreadcrumbSchema(
            [
              { name: tHub("eyebrow"), path: "/soluciones" },
              { name: solution.title, path: solution.href },
            ],
            locale
          ),
        ]}
      />

      <Section tone="subtle" className="pt-10 pb-10">
        <Breadcrumb items={[{ label: tHub("eyebrow"), href: "/soluciones" }, { label: solution.title }]} />
        <div className="max-w-2xl">
          <div className="text-label uppercase text-dta-blue-600 mb-3">{solution.title}</div>
          <h1 className="text-display-sm md:text-h2 text-dta-black">{solution.problemHeadline}</h1>
          <p className="text-body-lg text-dta-gray-600 mt-4">{solution.longDescription}</p>
          <div className="flex gap-3 mt-6">
            <Button href="/contacto?intent=audit" variant="primary">
              {tc("analizarMiEmpresa")}
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="light">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-h3 text-dta-black mb-4">{t("useCasesTitle")}</h2>
            <ul className="space-y-3">
              {solution.useCases.map((u) => (
                <li key={u} className="flex items-start gap-2 text-sm text-dta-black/80">
                  <CheckCircle2 size={15} className="text-dta-blue-600 shrink-0 mt-0.5" aria-hidden="true" /> {u}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-h3 text-dta-black mb-4">{t("deliverablesTitle")}</h2>
            <ul className="space-y-3">
              {solution.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-dta-black/80">
                  <CheckCircle2 size={15} className="text-dta-blue-600 shrink-0 mt-0.5" aria-hidden="true" /> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {solution.technologies && solution.technologies.length > 0 && (
          <div className="mt-10">
            <h2 className="text-h3 text-dta-black mb-3">{t("technologiesTitle")}</h2>
            <div className="flex flex-wrap gap-2">
              {solution.technologies.map((techName) => (
                <span key={techName} className="px-3 py-1 rounded-full bg-dta-gray-50 border border-dta-gray-200 text-xs text-dta-gray-600">
                  {techName}
                </span>
              ))}
            </div>
          </div>
        )}
      </Section>

      {related.length > 0 && (
        <Section tone="subtle">
          <h2 className="text-h3 text-dta-black mb-4">{t("relatedSectorsTitle")}</h2>
          <div className="flex flex-wrap gap-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={s.href}
                className="px-4 py-2 rounded-full bg-white border border-dta-gray-200 text-sm font-medium text-dta-black hover:border-dta-blue-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section tone="dark">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-h2">{t("ctaTitle")}</h2>
          <p className="text-white/70 mt-2 text-sm">{t("ctaText")}</p>
          <div className="flex justify-center mt-5">
            <Button href="/soluciones/dta-digital-audit" variant="secondary" className="bg-white/10 text-white border-white/20 hover:border-white/40">
              {tc("solicitarDiagnostico")}
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
