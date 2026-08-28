import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Search, CheckCircle2, Users, ClipboardList, Map, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import type { AppLocale } from "@/i18n/routing";

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

      <Section tone="subtle" className="pt-10 pb-10">
        <Breadcrumb items={[{ label: tHub("eyebrow"), href: "/soluciones" }, { label: "DTA Digital Audit" }]} />
        <div className="max-w-2xl">
          <div className="text-label uppercase text-dta-blue-600 mb-3">{t("eyebrow")}</div>
          <h1 className="text-display-sm md:text-h2 text-dta-black">{t("title")}</h1>
          <p className="text-body-lg text-dta-gray-600 mt-4">{t("intro")}</p>
          <div className="flex items-center gap-4 mt-6">
            <div className="text-2xl font-extrabold text-dta-black">
              {tc("desde")} <span className="text-dta-blue-600">$4,900</span>{" "}
              <span className="text-sm font-medium text-dta-gray-600">MXN</span>
            </div>
          </div>
          <div className="mt-4">
            <Button href="/contacto?intent=audit" variant="primary">
              {tc("solicitarDiagnostico")}
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="light">
        <h2 className="text-h3 text-dta-black mb-2">{t("whoTitle")}</h2>
        <p className="text-dta-gray-600 max-w-2xl mb-8">{t("whoText")}</p>

        <h2 className="text-h3 text-dta-black mb-4">{t("analyzeTitle")}</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {analysisItems.map((it) => (
            <div key={it.title} className="rounded-card border border-dta-gray-200 p-5">
              <it.icon size={20} className="text-dta-blue-600 mb-3" aria-hidden="true" />
              <div className="font-bold text-dta-black text-sm">{it.title}</div>
              <p className="text-sm text-dta-gray-600 mt-1">{it.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="subtle">
        <h2 className="text-h3 text-dta-black mb-4">{t("receiveTitle")}</h2>
        <ul className="space-y-3 max-w-xl">
          {receives.map((r) => (
            <li key={r} className="flex items-start gap-2 text-sm text-dta-black/80">
              <CheckCircle2 size={15} className="text-dta-blue-600 shrink-0 mt-0.5" aria-hidden="true" /> {r}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light">
        <h2 className="text-h3 text-dta-black mb-6">{t("processTitle")}</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          {process.map((s, i) => (
            <ProcessStep key={s.title} number={String(i + 1)} title={s.title} description={s.description} isLast={i === process.length - 1} />
          ))}
        </div>
      </Section>

      <Section tone="subtle">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-h3 text-dta-black mb-4">{t("benefitsTitle")}</h2>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-dta-black/80">
                  <Sparkles size={15} className="text-dta-blue-600 shrink-0 mt-0.5" aria-hidden="true" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card bg-white border border-dta-gray-200 p-6 flex items-center justify-center aspect-video text-dta-gray-200">
            <Map size={48} aria-hidden="true" />
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-h2">{t("finalCtaTitle")}</h2>
          <div className="flex justify-center mt-5">
            <Button href="/contacto?intent=audit" variant="secondary" className="bg-white/10 text-white border-white/20 hover:border-white/40">
              {tc("solicitarDiagnostico")}
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
