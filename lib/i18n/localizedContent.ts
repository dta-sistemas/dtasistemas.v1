import { solutions, dtaCareSummary, type Solution } from "@/data/solutions";
import { sectors, otherSectorsCard, type Sector } from "@/data/sectors";
import { projects, type Project } from "@/data/projects";
import { solutionsEn } from "@/data/translations/solutions.en";
import { sectorsEn } from "@/data/translations/sectors.en";
import { projectsEn } from "@/data/translations/projects.en";
import type { AppLocale as Locale } from "@/i18n/routing";

/**
 * Capa de localización de contenido (Fase 13). data/solutions.ts,
 * data/sectors.ts y data/projects.ts siguen siendo la fuente canónica en
 * español (slugs, íconos, hrefs, relatedSectors/relatedSolutions — nada de
 * esto cambia por idioma). Los archivos en data/translations/*.en.ts
 * aportan únicamente los campos de texto en inglés. Estas funciones
 * combinan ambos en runtime según el locale — el resto del código nunca
 * importa data/solutions.ts directamente en páginas localizadas, siempre
 * pasa por aquí.
 */

export function localizeSolution(solution: Solution, locale: Locale): Solution {
  if (locale === "es") return solution;
  const t = solutionsEn[solution.slug];
  if (!t) return solution; // fallback seguro: si falta traducción, muestra español antes que romper
  return { ...solution, ...t };
}

export function getLocalizedSolutions(locale: Locale): Solution[] {
  return solutions.map((s) => localizeSolution(s, locale));
}

export function getLocalizedSolutionBySlug(slug: string, locale: Locale): Solution | undefined {
  const base = solutions.find((s) => s.slug === slug);
  return base ? localizeSolution(base, locale) : undefined;
}

export function getLocalizedDtaCareSummary(locale: Locale) {
  if (locale === "es") return dtaCareSummary;
  return {
    ...dtaCareSummary,
    title: "DTA Care",
    description: "We maintain, monitor and evolve your systems.",
    bullets: ["Technical support", "24/7 monitoring", "Preventive maintenance", "Continuous evolution"],
  };
}

export function localizeSector(sector: Sector, locale: Locale): Sector {
  if (locale === "es") return sector;
  const t = sectorsEn[sector.slug];
  if (!t) return sector;
  return {
    ...sector,
    name: t.name,
    tags: t.tags,
    headline: t.headline,
    heroDescription: t.heroDescription,
    problems: t.problems,
    relatedSolutions: sector.relatedSolutions.map((rs, i) => ({
      slug: rs.slug,
      angle: t.relatedSolutionsAngles[i] ?? rs.angle,
    })),
    seo: t.seo,
  };
}

export function getLocalizedSectors(locale: Locale): Sector[] {
  return sectors.map((s) => localizeSector(s, locale));
}

export function getLocalizedSectorBySlug(slug: string, locale: Locale): Sector | undefined {
  const base = sectors.find((s) => s.slug === slug);
  return base ? localizeSector(base, locale) : undefined;
}

export function getLocalizedOtherSectorsCard(locale: Locale) {
  if (locale === "es") return otherSectorsCard;
  return { ...otherSectorsCard, name: "Other industries", tags: ["Let's talk about how we can help"] };
}

export function localizeProject(project: Project, locale: Locale): Project {
  if (locale === "es") return project;
  const t = projectsEn[project.slug];
  if (!t) return project;
  return {
    ...project,
    sectorLabel: t.sectorLabel,
    title: t.title,
    summary: t.summary,
    problem: t.problem,
    solution: t.solution,
    result: t.result,
    seo: t.seo,
    // technology[] no se traduce: son nombres de tecnología (Next.js, PostgreSQL...), neutrales en ambos idiomas.
  };
}

export function getLocalizedProjects(locale: Locale): Project[] {
  return projects.map((p) => localizeProject(p, locale));
}

export function getLocalizedProjectBySlug(slug: string, locale: Locale): Project | undefined {
  const base = projects.find((p) => p.slug === slug);
  return base ? localizeProject(base, locale) : undefined;
}
