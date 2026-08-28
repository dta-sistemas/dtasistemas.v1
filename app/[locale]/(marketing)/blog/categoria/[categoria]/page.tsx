import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { BlogCard } from "@/components/cards/BlogCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import { getAllCategories, getCategoryBySlug, getPostsByCategory, slugifyCategory } from "@/lib/blog";
import { formatDate } from "@/lib/formatDate";
import { routing, type AppLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: AppLocale; categoria: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getAllCategories(locale).map((c) => ({ locale, categoria: slugifyCategory(c) })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, categoria } = await params;
  const category = getCategoryBySlug(categoria, locale);
  if (!category) return {};
  const t = await getTranslations({ locale, namespace: "blogPage" });
  return {
    title: `${category} — ${t("eyebrow")}`,
    alternates: buildAlternates(`/blog/categoria/${categoria}`, locale),
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { locale, categoria } = await params;
  setRequestLocale(locale);
  const category = getCategoryBySlug(categoria, locale);
  if (!category) notFound();

  const posts = getPostsByCategory(category, locale);
  const t = await getTranslations({ locale, namespace: "blogPage" });

  return (
    <div>
      <JsonLd
        data={buildBreadcrumbSchema(
          [
            { name: t("eyebrow"), path: "/blog" },
            { name: category, path: `/blog/categoria/${categoria}` },
          ],
          locale
        )}
      />

      <Section tone="subtle" className="pt-10 pb-10">
        <Breadcrumb items={[{ label: t("eyebrow"), href: "/blog" }, { label: category }]} />
        <h1 className="text-display-sm md:text-h2 text-dta-black">
          {t("categoryArticlesTitle")} <span className="text-dta-blue-600">{category}</span>
        </h1>
        <Link href="/blog" className="text-sm text-dta-blue-600 font-semibold hover:underline mt-3 inline-block">
          ← {t("backToCategories")}
        </Link>
      </Section>

      <Section tone="light">
        {posts.length > 0 ? (
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
        ) : (
          <p className="text-dta-gray-600 text-sm">{t("noArticles")}</p>
        )}
      </Section>
    </div>
  );
}
