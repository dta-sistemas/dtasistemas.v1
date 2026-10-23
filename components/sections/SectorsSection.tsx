"use client";

import { useTranslations, useLocale } from "next-intl";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { SectorCard } from "../cards/SectorCard";
import { getLocalizedSectors, getLocalizedOtherSectorsCard } from "@/lib/i18n/localizedContent";
import type { AppLocale } from "@/i18n/routing";

export function SectorsSection() {
  const t = useTranslations("home");
  const locale = useLocale() as AppLocale;
  const sectors = getLocalizedSectors(locale);
  const otherCard = getLocalizedOtherSectorsCard(locale);

  return (
    <Section tone="subtle">
      <SectionHeading eyebrow={t("sectorsEyebrow")} title={t("sectorsTitle")} align="center" />
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
        {sectors.map((s, i) => (
          <Reveal key={s.slug} delay={i * 70} className="h-full">
            <SectorCard name={s.name} tags={s.tags} image={s.image} icon={s.icon} href={s.href} />
          </Reveal>
        ))}
        <Reveal delay={sectors.length * 70} className="h-full">
          <SectorCard name={otherCard.name} tags={otherCard.tags} href={otherCard.href} isOther />
        </Reveal>
      </div>
    </Section>
  );
}
