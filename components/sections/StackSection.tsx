import { useTranslations } from "next-intl";
import { Section } from "../ui/Section";

/** Base tecnológica con la que DTA construye (stack real del proyecto, sin logos de terceros). */
const STACK = ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "PostgreSQL", "APIs REST"];

export function StackSection() {
  const t = useTranslations("home");

  return (
    <Section tone="light" className="!pt-0 md:!pt-0">
      <div className="grid gap-8 border-t border-dta-gray-200 pt-12 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <h2 className="text-h2 text-dta-black">{t("stackTitle")}</h2>
          <p className="mt-4 max-w-md text-dta-gray-600">{t("stackText")}</p>
        </div>
        <ul className="flex flex-wrap content-start gap-2 md:col-span-7" aria-label={t("stackLabel")}>
          {STACK.map((s) => (
            <li key={s} className="rounded-md border border-dta-gray-300 bg-white px-3.5 py-2 font-mono text-sm text-dta-black">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
