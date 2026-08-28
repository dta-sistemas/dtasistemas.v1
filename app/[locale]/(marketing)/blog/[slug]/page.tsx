import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Calendar, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { BlogCard } from "@/components/cards/BlogCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ViewTracker } from "@/components/analytics/ViewTracker";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { buildAlternates } from "@/lib/seo/alternates";
import { getAllSlugs, getPostBySlug, getRelatedPosts, slugifyCategory } from "@/lib/blog";
import { getLocalizedSolutionBySlug, getLocalizedSectorBySlug } from "@/lib/i18n/localizedContent";
import { formatDate } from "@/lib/formatDate";
import { routing, type AppLocale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: AppLocale; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getAllSlugs(locale).map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return {};

  return {
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.description,
    alternates: buildAlternates(`/blog/${post.slug}`, locale),
    openGraph: { title: post.title, description: post.description, type: "article", publishedTime: post.date, images: [post.image] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const relatedSolution = post.relatedSolution ? getLocalizedSolutionBySlug(post.relatedSolution, locale) : undefined;
  const relatedSector = post.relatedSector ? getLocalizedSectorBySlug(post.relatedSector, locale) : undefined;
  const relatedPosts = getRelatedPosts(post, locale);
  const t = await getTranslations({ locale, namespace: "blogPage" });
  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <div>
      <ViewTracker event="blog_read" slug={post.slug} />
      <JsonLd
        data={[
          buildArticleSchema({ title: post.title, description: post.description, url: `/blog/${post.slug}`, image: post.image, datePublished: post.date, author: post.author, locale }),
          buildBreadcrumbSchema(
            [
              { name: t("eyebrow"), path: "/blog" },
              { name: post.category, path: `/blog/categoria/${slugifyCategory(post.category)}` },
              { name: post.title, path: `/blog/${post.slug}` },
            ],
            locale
          ),
        ]}
      />

      <Section tone="subtle" className="pt-10 pb-8">
        <Breadcrumb
          items={[
            { label: t("eyebrow"), href: "/blog" },
            { label: post.category, href: `/blog/categoria/${slugifyCategory(post.category)}` },
            { label: post.title },
          ]}
        />
        <div className="max-w-2xl">
          <div className="text-label uppercase text-dta-blue-600 mb-3">{post.category}</div>
          <h1 className="text-display-sm md:text-h2 text-dta-black">{post.title}</h1>
          <div className="flex items-center gap-3 text-xs text-dta-gray-600 mt-4">
            <span className="flex items-center gap-1">
              <Calendar size={11} aria-hidden="true" /> {formatDate(post.date, locale)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} aria-hidden="true" /> {post.readingTime} {locale === "en" ? "min read" : "min de lectura"}
            </span>
            <span>· {post.author}</span>
          </div>
        </div>
      </Section>

      <Section tone="light">
        <div className="max-w-2xl">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {(relatedSolution || relatedSector) && (
          <div className="max-w-2xl mt-10 rounded-card bg-dta-blue-100 border border-dta-blue-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-sm text-dta-black">
              {relatedSolution && (
                <>
                  {t("relatedCta")} <span className="font-semibold">{relatedSolution.title}</span>.
                </>
              )}
              {relatedSector && !relatedSolution && (
                <>
                  {t("relatedCtaSector")} <span className="font-semibold">{relatedSector.name}</span>.
                </>
              )}
            </div>
            <Button href={relatedSolution ? relatedSolution.href : relatedSector!.href} variant="secondary">
              {tc("leerMas")}
            </Button>
          </div>
        )}
      </Section>

      {relatedPosts.length > 0 && (
        <Section tone="subtle">
          <h2 className="text-h3 text-dta-black mb-6">{t("relatedTitle")}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {relatedPosts.map((p) => (
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
      )}

      <Section tone="dark">
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-h2">{t("ctaTitle")}</h2>
          <div className="flex justify-center mt-5">
            <Button href="/soluciones/dta-digital-audit" variant="secondary" className="bg-white/10 text-white border-white/20 hover:border-white/40">
              {tc("solicitarDiagnostico")}
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
