import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Search, CheckCircle2, Users, ClipboardList, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import type { AppLocale } from "@/i18n/routing";
import { PageHero, HeroPanel } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
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

      <Section tone="light">
        <h2 className="text-h3 text-dta-black mb-2">{t("whoTitle")}</h2>
        <p className="text-dta-gray-600 max-w-2xl mb-8">{t("whoText")}</p>

        <h2 className="text-h3 text-dta-black mb-4">{t("analyzeTitle")}</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {analysisItems.map((it) => (
            <div key={it.title} className="group rounded-card border border-dta-gray-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-dta-blue-600/40 hover:shadow-card-hover">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-dta-blue-100 text-dta-blue-600 transition-colors duration-300 group-hover:bg-dta-blue-600 group-hover:text-white">
                <it.icon size={20} aria-hidden="true" />
              </div>
              <div className="font-bold text-dta-black">{it.title}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-dta-gray-600">{it.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="subtle">
        <h2 className="text-h3 text-dta-black mb-4">{t("receiveTitle")}</h2>
        <ul className="space-y-3 max-w-xl">
          {receives.map((r) => (
            <li key={r} className="flex items-start gap-2.5 text-[15px] text-dta-black/80">
              <CheckCircle2 size={15} className="text-dta-blue-600 shrink-0 mt-0.5" aria-hidden="true" /> {r}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light">
        <h2 className="mb-10 text-h3 text-dta-black">{t("processTitle")}</h2>
        <ol className="grid gap-6 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
          {process.map((s, i) => (
            <ProcessStep key={s.title} number={String(i + 1)} title={s.title} description={s.description} isLast={i === process.length - 1} />
          ))}
        </ol>
      </Section>

      <Section tone="subtle">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-h3 text-dta-black mb-4">{t("benefitsTitle")}</h2>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[15px] text-dta-black/80">
                  <Sparkles size={15} className="text-dta-blue-600 shrink-0 mt-0.5" aria-hidden="true" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <AuditPreview />
        </div>
      </Section>

      <CTABand title={t("finalCtaTitle")} href="/contacto?intent=audit" label={tc("solicitarDiagnostico")} />
    </div>
  );
}
