import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Search, CheckCircle2, Users, ClipboardList } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import type { AppLocale } from "@/i18n/routing";
import { PageHero, HeroPanel } from "@/components/sections/PageHero";
import { ConversionCTA } from "@/components/sections/ConversionCTA";
import { NumberedGrid, ChecklistPanel } from "@/components/sections/NumberedBlocks";
import { SolutionSectorsTabs, type SectorTabItem } from "@/components/sections/SolutionSectorsTabs";
import { getSolutionSectorCase } from "@/data/solutionSectors";
import { getLocalizedSectors } from "@/lib/i18n/localizedContent";
import { AuditPreview } from "@/components/sections/DigitalAudit";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auditPage" });
  return { title: t("title"), description: t("intro"), alternates: buildAlternates("/soluciones/dta-digital-audit", locale) };
}

export default async function DigitalAuditPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "auditPage" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const tHub = await getTranslations({ locale, namespace: "solucionesHub" });
  const tSol = await getTranslations({ locale, namespace: "solutionDetail" });

  const analysisItems = [
    { icon: ClipboardList, title: t("analyze1Title"), text: t("analyze1Text") },
    { icon: Users, title: t("analyze2Title"), text: t("analyze2Text") },
    { icon: Search, title: t("analyze3Title"), text: t("analyze3Text") },
  ];
  const receives = [t("receive1"), t("receive2"), t("receive3"), t("receive4")];
  const process = [
    { title: t("process1Title"), description: t("process1Text") },
    { title: t("process2Title"), description: t("process2Text") },
    { title: t("process3Title"), description: t("process3Text") },
    { title: t("process4Title"), description: t("process4Text") },
  ];
  const benefits = [t("benefit1"), t("benefit2"), t("benefit3")];

  const sectorTabs: SectorTabItem[] = getLocalizedSectors(locale).map((s) => {
    const c = getSolutionSectorCase("dta-digital-audit", s.slug, locale);
    return { slug: s.slug, name: s.name, href: s.href, problem: c?.problem ?? s.problems[0], solution: c?.solution ?? [], example: c?.example };
  });

  return (
    <div>
      <JsonLd
        data={[
          buildServiceSchema({ name: "DTA Digital Audit", description: t("intro"), url: "/soluciones/dta-digital-audit", locale }),
          buildBreadcrumbSchema(
            [
              { name: tHub("eyebrow"), path: "/soluciones" },
              { name: "DTA Digital Audit", path: "/soluciones/dta-digital-audit" },
            ],
            locale
          ),
        ]}
      />

      <PageHero
        breadcrumb={[{ label: tHub("eyebrow"), href: "/soluciones" }, { label: "DTA Digital Audit" }]}
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("intro")}
        aside={
          <HeroPanel>
            <div className="text-3xl font-extrabold tracking-tight">
              <span className="mr-1.5 text-sm font-medium text-white/60">{tc("desde")}</span>
              <span className="text-dta-blue-300">$4,900</span>{" "}
              <span className="text-sm font-medium text-white/60">MXN</span>
            </div>
            <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
              {receives.slice(0, 3).map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm text-white/80">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-dta-blue-300" aria-hidden="true" /> {r}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Button href="/contacto?intent=audit" variant="light" className="w-full">
                {tc("solicitarDiagnostico")}
              </Button>
            </div>
          </HeroPanel>
        }
      />


      {/* Para quién es y qué analizamos */}
      <Section tone="light">
        <div className="max-w-3xl">
          <h2 className="text-h2 text-dta-black">{t("whoTitle")}</h2>
          <p className="mt-4 font-serif text-2xl leading-snug text-dta-gray-700 md:text-[1.75rem]">{t("whoText")}</p>
        </div>
        <div className="mt-16 max-w-2xl">
          <h2 className="text-h2 text-dta-black">{t("analyzeTitle")}</h2>
          <p className="mt-3 text-body-lg text-dta-gray-600">{t("analyzeLead")}</p>
        </div>
        <NumberedGrid
          className="md:grid-cols-3"
          items={analysisItems.map((it) => ({ title: it.title, text: it.text }))}
        />
      </Section>

      {/* Qué recibe tu empresa: bloque azul marino */}
      <Section tone="subtle">
        <ChecklistPanel module={t("receiveModule")} title={t("receiveTitle")} lead={t("receiveLead")} items={receives} />
      </Section>

      {/* Proceso */}
      <Section tone="light">
        <h2 className="mb-12 text-h2 text-dta-black">{t("processTitle")}</h2>
        <ol className="grid gap-6 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
          {process.map((s, i) => (
            <ProcessStep key={s.title} number={String(i + 1)} title={s.title} description={s.description} isLast={i === process.length - 1} />
          ))}
        </ol>
      </Section>

      {/* Beneficios + vista previa del reporte */}
      <Section tone="subtle">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-h2 text-dta-black">{t("benefitsTitle")}</h2>
            <p className="mt-3 text-body-lg text-dta-gray-600">{t("benefitsLead")}</p>
            <NumberedGrid className="md:grid-cols-1" items={benefits.map((b) => ({ text: b }))} />
          </div>
          <AuditPreview />
        </div>
      </Section>

      {/* Sectores donde más aplica */}
      <Section tone="light">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-h2 text-dta-black">{t("sectorsTitle")}</h2>
          <p className="mt-3 text-body-lg text-dta-gray-600">{t("sectorsIntro")}</p>
        </div>
        <SolutionSectorsTabs
          idPrefix="audit"
          items={sectorTabs}
          labels={{
            problem: tSol("sectorProblem"),
            solution: t("sectorSolution"),
            example: tSol("sectorExample"),
            illustrative: tSol("sectorIllustrative"),
            viewSector: tc("verSector"),
          }}
        />
      </Section>

      <ConversionCTA locale={locale} title={t("finalCtaTitle")} text={t("ctaText")} source="audit-page" />
    </div>
  );
}
