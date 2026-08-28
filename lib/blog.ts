import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { AppLocale as Locale } from "@/i18n/routing";

const BLOG_ROOT = path.join(process.cwd(), "content/blog");

export type BlogFrontmatter = {
  title: string;
  slug: string;
  description: string;
  date: string; // ISO "YYYY-MM-DD"
  author: string;
  category: string;
  tags: string[];
  image: string;
  readingTime: number;
  /** Slug de data/solutions.ts — usado para el CTA de internal linking al final del artículo. */
  relatedSolution?: string | null;
  /** Slug de data/sectors.ts — opcional, no todo artículo es específico de un sector. */
  relatedSector?: string | null;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
};

export type BlogPost = BlogFrontmatter & {
  /** Contenido MDX crudo (sin el frontmatter), listo para pasar a <MDXRemote source={content} />. */
  content: string;
};

/**
 * Capa de acceso a contenido de blog — consciente del idioma desde Fase 13.
 * Lee content/blog/{locale}/*.mdx (antes content/blog/*.mdx sin locale).
 *
 * IMPORTANTE: el mismo slug se usa en ambas carpetas de idioma a propósito
 * (ej. content/blog/es/crm-para-inmobiliarias.mdx y
 * content/blog/en/crm-para-inmobiliarias.mdx) — así, cambiar de idioma en
 * un artículo específico solo cambia el prefijo de locale en la URL sin
 * romper el enlace ni requerir un mapeo es↔en por separado.
 */
function blogDir(locale: Locale): string {
  return path.join(BLOG_ROOT, locale);
}

function getMdxFilenames(locale: Locale): string[] {
  const dir = blogDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

export function getAllSlugs(locale: Locale): string[] {
  return getMdxFilenames(locale).map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string, locale: Locale): BlogPost | undefined {
  const filePath = path.join(blogDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return { ...(data as BlogFrontmatter), content };
}

export function getAllPosts(locale: Locale): BlogPost[] {
  return getAllSlugs(locale)
    .map((slug) => getPostBySlug(slug, locale))
    .filter((p): p is BlogPost => Boolean(p))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByCategory(category: string, locale: Locale): BlogPost[] {
  return getAllPosts(locale).filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getAllCategories(locale: Locale): string[] {
  const categories = new Set(getAllPosts(locale).map((p) => p.category));
  return Array.from(categories);
}

/** Slugify simple para construir la URL de categoría a partir del nombre visible. */
export function slugifyCategory(category: string): string {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getCategoryBySlug(slug: string, locale: Locale): string | undefined {
  return getAllCategories(locale).find((c) => slugifyCategory(c) === slug);
}

/** Related posts por coincidencia de categoría o tags — usado al final de cada artículo. */
export function getRelatedPosts(post: BlogPost, locale: Locale, limit = 3): BlogPost[] {
  return getAllPosts(locale)
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
    .slice(0, limit);
}
