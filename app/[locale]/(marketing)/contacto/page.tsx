import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MessageCircle, ShieldCheck, Users2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactChannelRow } from "@/components/forms/ContactChannelRow";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import type { ContactFormValues } from "@/lib/validation/contactSchema";
import type { AppLocale } from "@/i18n/routing";

const INTENT_TO_HELP_TYPE: Record<string, ContactFormValues["helpType"]> = {
  audit: "dta-digital-audit",
  care: "otro",
  sistemas: "sistemas",
  integracion: "integracion",
  inteligencia: "inteligencia",
  automatizacion: "automatizacion-ia",
  desarrollo: "desarrollo-digital",
};

type Props = { params: Promise<{ locale: AppLocale }>; searchParams: Promise<{ intent?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactoPage" });
  return { title: t("title1") + " " + t("title2") + " " + t("title3"), description: t("intro"), alternates: buildAlternates("/contacto", locale) };
}

export default async function ContactoPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { intent } = await searchParams;
  const defaultHelpType = intent ? INTENT_TO_HELP_TYPE[intent] : undefined;
  const t = await getTranslations({ locale, namespace: "contactoPage" });

  const channels = [
    { iconKey: "phone" as const, label: t("channelPhone"), value: "+52 998 123 4567", href: "https://wa.me/529981234567", trackEvent: "whatsapp" as const },
    { iconKey: "mail" as const, label: t("channelEmail"), value: "contacto@dtasistemas.com", href: "mailto:contacto@dtasistemas.com", trackEvent: "email" as const },
    { iconKey: "mapPin" as const, label: t("channelOffice"), value: "Cancún, Quintana Roo, México" },
    { iconKey: "clock" as const, label: t("channelSchedule"), value: t("scheduleValue") },
  ];

  return (
    <div>
      <JsonLd data={[buildLocalBusinessSchema(locale), buildBreadcrumbSchema([{ name: t("eyebrow"), path: "/contacto" }], locale)]} />

      <Section tone="subtle" className="pt-10 pb-8">
        <Breadcrumb items={[{ label: t("eyebrow") }]} />
        <div className="max-w-2xl">
          <div className="text-label uppercase text-dta-blue-600 mb-3">{t("eyebrow")}</div>
          <h1 className="text-display-sm md:text-h2 text-dta-black">
            {t("title1")} <span className="text-dta-blue-600">{t("title2")}</span> {t("title3")}
          </h1>
          <p className="text-body-lg text-dta-gray-600 mt-4">{t("intro")}</p>

          <div className="grid sm:grid-cols-3 gap-5 mt-6">
            <div className="flex items-start gap-2">
              <MessageCircle size={16} className="text-dta-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="text-xs font-bold text-dta-black">{t("point1Title")}</div>
                <div className="text-[11px] text-dta-gray-600">{t("point1Text")}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck size={16} className="text-dta-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="text-xs font-bold text-dta-black">{t("point2Title")}</div>
                <div className="text-[11px] text-dta-gray-600">{t("point2Text")}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Users2 size={16} className="text-dta-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="text-xs font-bold text-dta-black">{t("point3Title")}</div>
                <div className="text-[11px] text-dta-gray-600">{t("point3Text")}</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="light">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-h3 text-dta-black mb-1">{t("talkTitle")}</h2>
            <p className="text-sm text-dta-gray-600 mb-4">{t("talkText")}</p>
            <div className="space-y-3">
              {channels.map((c) => (
                <ContactChannelRow key={c.label} {...c} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-h3 text-dta-black mb-4">{t("formTitle")}</h2>
            <ContactForm source={intent ?? "contacto-directo"} defaultHelpType={defaultHelpType} />
          </div>
        </div>
      </Section>

      <Section tone="subtle">
        <div className="rounded-card bg-white border border-dta-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-bold text-dta-black">{t("meetingTitle")}</div>
            <p className="text-sm text-dta-gray-600 mt-1">{t("meetingText")}</p>
          </div>
          <Button href="mailto:contacto@dtasistemas.com?subject=Agendar%20llamada" variant="secondary">
            {t("meetingCta")}
          </Button>
        </div>
      </Section>
    </div>
  );
}
