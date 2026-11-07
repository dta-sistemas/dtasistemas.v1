import { useTranslations } from "next-intl";
import { Section } from "../ui/Section";

const ITEM_KEYS = ["estrategia", "tecnologia", "datos"] as const;

export function Differentiation() {
  const t = useTranslations("home");
  const ti = useTranslations("diffItems");

  return (
    <Section tone="light">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <h2 className="text-h2 text-dta-black">{t("diffTitle")}</h2>
          <p className="mt-4 max-w-md text-body-lg text-dta-gray-600">{t("diffText")}</p>
        </div>
        <dl className="grid divide-y divide-dta-gray-200 border-y border-dta-gray-200 md:col-span-7 md:grid-cols-3 md:divide-x md:divide-y-0">
          {ITEM_KEYS.map((key) => (
            <div key={key} className="py-5 md:px-6 md:first:pl-0 md:last:pr-0">
              <dt className="font-serif text-xl text-dta-black">{ti(`${key}.title`)}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-dta-gray-600">{ti(`${key}.text`)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
