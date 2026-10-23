import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { BlogCard } from "@/components/cards/BlogCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import { getAllPosts, getAllCategories, slugifyCategory } from "@/lib/blog";
import { formatDate } from "@/lib/formatDate";
import type { AppLocale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/PageHero";

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

      <PageHero
        breadcrumb={[{ label: t("eyebrow") }]}
        eyebrow={t("eyebrow")}
        title={
          <>
            {t("title1")} <span className="text-dta-blue-600">{t("title2")}</span>
          </>
        }
        description={t("intro")}
      />

      <Section tone="light">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Link href="/blog" aria-current="page" className="rounded-full bg-dta-blue-600 px-4 py-2 text-sm font-medium text-white">
              {t("allCategories")}
            </Link>
            {categories.map((c) => (
              <Link
                key={c}
                href={`/blog/categoria/${slugifyCategory(c)}`}
                className="rounded-full border border-dta-gray-200 bg-white px-4 py-2 text-sm font-medium text-dta-black transition-colors hover:border-dta-blue-600 hover:text-dta-blue-600"
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
