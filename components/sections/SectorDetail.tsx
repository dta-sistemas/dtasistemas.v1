import { CheckCircle2, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Link } from "@/i18n/navigation";
import { PageHero, HeroPanel } from "./PageHero";
import { CTABand } from "./CTABand";
import { Reveal } from "../ui/Reveal";
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

      <PageHero
        breadcrumb={[{ label: tHub("eyebrow"), href: "/sectores" }, { label: sector.name }]}
        eyebrow={sector.name}
        title={sector.headline}
        description={sector.heroDescription}
        actions={
          <Button href="/contacto?intent=audit" variant="primary">
            {tc("analizarMiEmpresa")}
          </Button>
        }
        aside={
          <HeroPanel>
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-dta-blue-300">
              <sector.icon size={22} aria-hidden="true" />
            </span>
            <div className="mt-5 text-xl font-bold uppercase tracking-wide">{sector.name}</div>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-5">
              {sector.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80">
                  {tag}
                </span>
              ))}
            </div>
          </HeroPanel>
        }
      />

      <Section tone="light">
        <h2 className="mb-6 text-h3 text-dta-black">
          {t("problemsPrefix")} {sector.name.toLowerCase()}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {sector.problems.map((p, i) => (
            <Reveal key={p} delay={(i % 2) * 80} className="h-full">
              <div className="flex h-full items-start gap-3 rounded-card border border-dta-gray-200 bg-dta-gray-50 p-5 text-[15px] leading-relaxed text-dta-black/85">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-dta-blue-600" aria-hidden="true" /> {p}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="subtle">
        <h2 className="mb-6 text-h3 text-dta-black">
          {t("howWeHelpPrefix")} {sector.name.toLowerCase()}
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {resolvedSolutions.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug} delay={i * 80} className="h-full">
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-card border border-dta-gray-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-dta-blue-600/40 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-dta-blue-600"
                >
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-dta-blue-100 text-dta-blue-600 transition-colors duration-300 group-hover:bg-dta-blue-600 group-hover:text-white">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div className="font-bold text-dta-black">{s.title}</div>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-dta-gray-600">{s.angle}</p>
                  <ArrowRight size={16} className="mt-4 text-dta-blue-600 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CTABand
        title={t("ctaTitle")}
        text={`${t("ctaTextPrefix")} ${sector.name.toLowerCase()}.`}
        href="/soluciones/dta-digital-audit"
        label={tc("solicitarDiagnostico")}
      />
    </div>
  );
}
