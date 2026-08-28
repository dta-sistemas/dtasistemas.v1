import type { MetadataRoute } from "next";
import { solutions } from "@/data/solutions";
import { sectors } from "@/data/sectors";
import { projects } from "@/data/projects";
import { getAllPosts, getAllCategories, slugifyCategory } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";

/**
 * Sitemap dinámico — Fase 13: cada entrada ahora emite `alternates.languages`
 * (hreflang es/en) apuntando a la URL correspondiente en cada idioma —
 * español sin prefijo (localePrefix: "as-needed"), inglés con /en. Esto le
 * dice a Google que ambas versiones son traducciones de la misma página,
 * no contenido duplicado.
 */
function esUrl(path: string): string {
  return `${SITE_URL}${path}`;
}
function enUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/en` : `${SITE_URL}/en${path}`;
}

function entry(path: string, opts: { changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number; lastModified?: string }): MetadataRoute.Sitemap[number] {
  return {
    url: esUrl(path),
    ...opts,
    alternates: { languages: { es: esUrl(path), en: enUrl(path) } },
  };
}

/** Misma entrada pero con la URL principal en inglés (para que ambas versiones aparezcan como items separados del sitemap). */
function entryEn(path: string, opts: { changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number; lastModified?: string }): MetadataRoute.Sitemap[number] {
  return {
    url: enUrl(path),
    ...opts,
    alternates: { languages: { es: esUrl(path), en: enUrl(path) } },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/soluciones", changeFrequency: "monthly", priority: 0.9 },
    { path: "/sectores", changeFrequency: "monthly", priority: 0.9 },
    { path: "/proyectos", changeFrequency: "monthly", priority: 0.8 },
    { path: "/dta", changeFrequency: "monthly", priority: 0.7 },
    { path: "/dta-care", changeFrequency: "monthly", priority: 0.6 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/contacto", changeFrequency: "yearly", priority: 0.7 },
    ...solutions.map((s) => ({ path: s.href, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...sectors.map((s) => ({ path: s.href, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...projects.map((p) => ({ path: `/proyectos/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const { path, changeFrequency, priority } of staticPaths) {
    entries.push(entry(path, { changeFrequency, priority }));
    entries.push(entryEn(path, { changeFrequency, priority }));
  }

  // Categorías y artículos de blog — cada idioma tiene su propio set de
  // categorías/slugs (mismos slugs, contenido distinto, ver lib/blog.ts).
  for (const locale of routing.locales) {
    const categories = getAllCategories(locale);
    const posts = getAllPosts(locale);

    for (const c of categories) {
      const path = `/blog/categoria/${slugifyCategory(c)}`;
      entries.push(
        locale === "en"
          ? entryEn(path, { changeFrequency: "weekly", priority: 0.5 })
          : entry(path, { changeFrequency: "weekly", priority: 0.5 })
      );
    }

    for (const p of posts) {
      const path = `/blog/${p.slug}`;
      entries.push(
        locale === "en"
          ? entryEn(path, { changeFrequency: "monthly", priority: 0.6, lastModified: p.date })
          : entry(path, { changeFrequency: "monthly", priority: 0.6, lastModified: p.date })
      );
    }
  }

  return entries;
}
