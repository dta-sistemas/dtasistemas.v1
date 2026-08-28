"use client";

import { useTranslations, useLocale } from "next-intl";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-10">
        {sectors.map((s) => (
          <SectorCard key={s.slug} name={s.name} tags={s.tags} image={s.image} icon={s.icon} href={s.href} />
        ))}
        <SectorCard name={otherCard.name} tags={otherCard.tags} href={otherCard.href} isOther />
      </div>
    </Section>
  );
}
