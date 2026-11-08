import { useTranslations, useLocale } from "next-intl";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { SectorGrid } from "./SectorGrid";
import { getLocalizedSectors, getLocalizedOtherSectorsCard } from "@/lib/i18n/localizedContent";
import type { AppLocale } from "@/i18n/routing";

/** Sectores sin fotos de stock: el sector y los sistemas que más conectamos ahí. */
export function SectorsSection() {
  const t = useTranslations("home");
  const locale = useLocale() as AppLocale;
  const rows = [...getLocalizedSectors(locale), getLocalizedOtherSectorsCard(locale)];

  return (
    <Section tone="subtle">
      <SectionHeading title={t("sectorsTitle")} subtitle={t("sectorsText")} />
      <div className="mt-12">
        <SectorGrid rows={rows} />
      </div>
    </Section>
  );
}
