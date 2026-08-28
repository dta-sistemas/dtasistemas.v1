import { CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "../navigation/Breadcrumb";
import { JsonLd } from "../seo/JsonLd";
import { ViewTracker } from "../analytics/ViewTracker";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { getLocalizedSolutionBySlug } from "@/lib/i18n/localizedContent";
import type { Sector } from "@/data/sectors";
import type { AppLocale } from "@/i18n/routing";

export async function SectorDetail({ sector, locale }: { sector: Sector; locale: AppLocale }) {
  const t = await getTranslations({ locale, namespace: "sectorDetail" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const tHub = await getTranslations({ locale, namespace: "sectoresHub" });

  const resolvedSolutions = sector.relatedSolutions
    .map((rs) => {
      const solution = getLocalizedSolutionBySlug(rs.slug, locale);
      return solution ? { ...solution, angle: rs.angle } : null;
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);

  return (
    <div>
      <ViewTracker event="sector_view" slug={sector.slug} />
      <JsonLd
        data={[
          buildServiceSchema({ name: sector.seo.metaTitle, description: sector.seo.metaDescription, url: sector.href, locale }),
          buildBreadcrumbSchema(
            [
              { name: tHub("eyebrow"), path: "/sectores" },
              { name: sector.name, path: sector.href },
            ],
            locale
          ),
        ]}
      />

      <Section tone="subtle" className="pt-10 pb-10">
        <Breadcrumb items={[{ label: tHub("eyebrow"), href: "/sectores" }, { label: sector.name }]} />
        <div className="max-w-2xl">
          <div className="text-label uppercase text-dta-blue-600 mb-3">{sector.name}</div>
          <h1 className="text-display-sm md:text-h2 text-dta-black">{sector.headline}</h1>
          <p className="text-body-lg text-dta-gray-600 mt-4">{sector.heroDescription}</p>
          <div className="flex gap-3 mt-6">
            <Button href="/contacto?intent=audit" variant="primary">
              {tc("analizarMiEmpresa")}
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="light">
        <h2 className="text-h3 text-dta-black mb-4">
          {t("problemsPrefix")} {sector.name.toLowerCase()}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {sector.problems.map((p) => (
            <div key={p} className="flex items-start gap-2 text-sm text-dta-black/80 rounded-card border border-dta-gray-200 p-4">
              <CheckCircle2 size={14} className="text-dta-blue-600 shrink-0 mt-0.5" aria-hidden="true" /> {p}
            </div>
          ))}
        </div>
      </Section>

      <Section tone="subtle">
        <h2 className="text-h3 text-dta-black mb-4">
          {t("howWeHelpPrefix")} {sector.name.toLowerCase()}
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {resolvedSolutions.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                href={s.href}
                className="rounded-card border border-dta-gray-200 bg-white p-5 hover:shadow-md transition-shadow block focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
              >
                <Icon size={20} className="text-dta-blue-600 mb-3" aria-hidden="true" />
                <div className="font-bold text-dta-black text-sm">{s.title}</div>
                <p className="text-sm text-dta-gray-600 mt-1">{s.angle}</p>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section tone="dark">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-h2">{t("ctaTitle")}</h2>
          <p className="text-white/70 mt-2 text-sm">
            {t("ctaTextPrefix")} {sector.name.toLowerCase()}.
          </p>
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
