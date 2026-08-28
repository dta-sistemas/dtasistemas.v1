import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { BlogCard } from "@/components/cards/BlogCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import { getAllPosts, getAllCategories, slugifyCategory } from "@/lib/blog";
import { formatDate } from "@/lib/formatDate";
import type { AppLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: AppLocale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogPage" });
  return { title: t("title1") + " " + t("title2"), description: t("intro"), alternates: buildAlternates("/blog", locale) };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blogPage" });
  const posts = getAllPosts(locale);
  const categories = getAllCategories(locale);

  return (
    <div>
      <JsonLd data={buildBreadcrumbSchema([{ name: t("eyebrow"), path: "/blog" }], locale)} />

      <Section tone="subtle" className="pt-10 pb-10">
        <Breadcrumb items={[{ label: t("eyebrow") }]} />
        <div className="max-w-2xl">
          <div className="text-label uppercase text-dta-blue-600 mb-3">{t("eyebrow")}</div>
          <h1 className="text-display-sm md:text-h2 text-dta-black">
            {t("title1")} <span className="text-dta-blue-600">{t("title2")}</span>
          </h1>
          <p className="text-body-lg text-dta-gray-600 mt-4">{t("intro")}</p>
        </div>
      </Section>

      <Section tone="light">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Link href="/blog" className="px-4 py-2 rounded-full text-sm font-medium bg-dta-blue-600 text-white">
              {t("allCategories")}
            </Link>
            {categories.map((c) => (
              <Link
                key={c}
                href={`/blog/categoria/${slugifyCategory(c)}`}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white text-dta-black border border-dta-gray-200 hover:border-dta-gray-600 transition-colors"
              >
                {c}
              </Link>
            ))}
          </div>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {posts.map((p) => (
            <BlogCard
              key={p.slug}
              category={p.category}
              categoryHref={`/blog/categoria/${slugifyCategory(p.category)}`}
              title={p.title}
              date={formatDate(p.date, locale)}
              readingTime={p.readingTime}
              image={p.image}
              href={`/blog/${p.slug}`}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
