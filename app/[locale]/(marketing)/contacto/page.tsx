import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MessageCircle, ShieldCheck, Users2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PageHero, HeroPanel } from "@/components/sections/PageHero";
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
    { iconKey: "phone" as const, label: t("channelPhone"), value: "+52 000 000 0000", href: "https://wa.me/52000000000", trackEvent: "whatsapp" as const },
    { iconKey: "mail" as const, label: t("channelEmail"), value: "contacto@dtasistemas.com", href: "mailto:contacto@dtasistemas.com", trackEvent: "email" as const },
    { iconKey: "mapPin" as const, label: t("channelOffice"), value: "Cancún, Quintana Roo, México" },
    { iconKey: "clock" as const, label: t("channelSchedule"), value: t("scheduleValue") },
  ];

  return (
    <div>
      <JsonLd data={[buildLocalBusinessSchema(locale), buildBreadcrumbSchema([{ name: t("eyebrow"), path: "/contacto" }], locale)]} />

      <PageHero
        breadcrumb={[{ label: t("eyebrow") }]}
        eyebrow={t("eyebrow")}
        title={
          <>
            {t("title1")} <span className="text-dta-blue-600">{t("title2")}</span> {t("title3")}
          </>
        }
        description={t("intro")}
        aside={
          <HeroPanel>
            <ul className="space-y-6">
              {[
                { icon: MessageCircle, title: t("point1Title"), text: t("point1Text") },
                { icon: ShieldCheck, title: t("point2Title"), text: t("point2Text") },
                { icon: Users2, title: t("point3Title"), text: t("point3Text") },
              ].map((it) => (
                <li key={it.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-dta-blue-300">
                    <it.icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <div className="font-bold">{it.title}</div>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">{it.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </HeroPanel>
        }
      />

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
        <div className="flex flex-col items-start justify-between gap-4 rounded-card border border-dta-gray-200 bg-white p-6 shadow-card sm:flex-row sm:items-center">
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
