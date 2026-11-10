import { useTranslations, useLocale } from "next-intl";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Carousel } from "../ui/Carousel";
import { SectorTile } from "../cards/SectorTile";
import { getLocalizedSectors, getLocalizedOtherSectorsCard } from "@/lib/i18n/localizedContent";
import type { AppLocale } from "@/i18n/routing";

/**
 * Sectores en carrusel: en escritorio se ven 4 fichas completas y un pedazo de la 5.ª ("Otros
 * sectores") para que se note que hay más y se pueda seguir (botones o deslizar); en el
 * celular asoma la siguiente ficha y se desliza con el dedo.
 */
export function SectorsSection() {
  const t = useTranslations("home");
  const locale = useLocale() as AppLocale;
  const rows = [...getLocalizedSectors(locale), getLocalizedOtherSectorsCard(locale)];

  return (
    <Section tone="subtle">
      <SectionHeading title={t("sectorsTitle")} subtitle={t("sectorsText")} />
      <div className="mt-10">
        <Carousel
          label={t("sectorsTitle")}
          prevLabel={t("carouselPrev")}
          nextLabel={t("carouselNext")}
          // 4.35 fichas por vista en escritorio: 4 completas + 35 % de la quinta.
          itemClassName="basis-[82%] sm:basis-[46%] md:basis-[38%] lg:basis-[calc((100%-4*1.25rem)/4.35)]"
          arrows
          dots
        >
          {rows.map((s) => (
            <SectorTile key={s.slug} slug={s.slug} name={s.name} tags={s.tags} href={s.href} />
          ))}
        </Carousel>
      </div>
    </Section>
  );
}
