/**
 * Traducción al inglés del catálogo de soluciones. data/solutions.ts sigue
 * siendo la fuente canónica (slugs, íconos, hrefs, relatedSectors nunca
 * cambian por idioma) — este archivo solo aporta los campos de texto en
 * inglés, combinados en runtime por lib/i18n/localizedContent.ts.
 */

export type SolutionTranslation = {
  title: string;
  description: string;
  problemHeadline: string;
  longDescription: string;
  bullets: string[];
  useCases: string[];
  deliverables: string[];
  seo: { metaTitle: string; metaDescription: string };
};

export const solutionsEn: Record<string, SolutionTranslation> = {
  "sistemas-empresariales": {
    title: "Systems",
    description: "We build the digital infrastructure of your operation.",
    problemHeadline: "Your operation runs on processes nobody designed on purpose",
    longDescription:
      "Most companies run on a mix of spreadsheets, WhatsApp, and systems that don't talk to each other. We design and build the systems your operation needs: from a custom CRM to internal platforms that bring order to how your team works.",
    bullets: ["CRM", "Internal platforms", "Booking systems", "Portals and more"],
    useCases: [
      "Centralize customer and sales information in one place.",
      "Digitize processes that today depend on spreadsheets or paper.",
      "Build a portal for your clients or vendors to self-serve.",
      "Replace a legacy system that no longer supports business growth.",
    ],
    deliverables: [
      "Diagnosis of current processes",
      "Proposed system architecture",
      "System running in production",
      "Documentation and team training",
    ],
    seo: {
      metaTitle: "Custom enterprise systems",
      metaDescription:
        "We design and build enterprise systems tailored to your processes: CRM, internal platforms, booking systems and portals.",
    },
  },
  "integracion-de-sistemas": {
    title: "Integration",
    description: "We connect the tools that today work in isolation.",
    problemHeadline: "Your tools don't talk to each other, and your team pays the price",
    longDescription:
      "When every system lives on its own island, someone has to copy information by hand from one place to another. We connect your platforms via APIs so data flows automatically between them, without double entry and without human error.",
    bullets: ["APIs and connectors", "Data synchronization", "System integration", "Workflow automation"],
    useCases: [
      "Sync your CRM with your booking platform or e-commerce.",
      "Connect your accounting system with your operations tools.",
      "Unify data from multiple branches or sales channels.",
      "Integrate your website with your internal management system.",
    ],
    deliverables: [
      "Map of required integrations",
      "Connectors and APIs implemented",
      "Sync monitoring",
      "Technical documentation",
    ],
    seo: {
      metaTitle: "System and API integration",
      metaDescription:
        "We connect the tools your business already uses: APIs, connectors and data synchronization between systems, without double entry.",
    },
  },
  "business-intelligence": {
    title: "Intelligence",
    description: "We turn your data into information for decisions.",
    problemHeadline: "You have data, but nobody has time to turn it into decisions",
    longDescription:
      "Having data isn't the same as having information. We build dashboards and reports that show your leadership team exactly what they need to know, updated, without relying on someone building a spreadsheet every week.",
    bullets: ["Executive dashboards", "KPIs and reports", "Data analysis", "Alerts and monitoring"],
    useCases: [
      "A single dashboard with the business's key metrics.",
      "Automatic reports that no longer depend on manual work.",
      "Alerts when a metric goes out of range.",
      "Historical analysis to spot trends and seasonality.",
    ],
    deliverables: [
      "Definition of relevant KPIs",
      "Dashboard implemented and connected to your data sources",
      "Automatic reports configured",
      "Training to interpret and use the data",
    ],
    seo: {
      metaTitle: "Business Intelligence and dashboards",
      metaDescription:
        "We turn your data into information for decisions: executive dashboards, KPIs, automatic reports and monitoring alerts.",
    },
  },
  "inteligencia-artificial": {
    title: "Automation & AI",
    description: "We take repetitive work off your processes.",
    problemHeadline: "Your team loses hours on tasks that could already solve themselves",
    longDescription:
      "Many companies lose hours a day on manual, repetitive tasks. We design automations and AI agents with a concrete business purpose — never AI as a trend — that do that work for your team.",
    bullets: ["Process automation", "AI agents", "Document processing"],
    useCases: [
      "Automate follow-up with leads and prospects.",
      "Generate recurring reports without manual intervention.",
      "Classify and process documents with AI.",
      "Answer customers' frequent questions with an agent trained on your business.",
    ],
    deliverables: [
      "Diagnosis of automatable processes",
      "Automation workflows implemented",
      "Technical system documentation",
      "Team training",
    ],
    seo: {
      metaTitle: "Process automation and Artificial Intelligence",
      metaDescription: "We automate repetitive processes and build AI agents with a concrete business purpose for your company.",
    },
  },
  "desarrollo-digital": {
    title: "Digital Development",
    description: "We create the digital experiences your business needs.",
    problemHeadline: "Your digital presence isn't living up to what your business actually does",
    longDescription:
      "A slow website, an online store that doesn't convert, or a client portal nobody uses: digital experience is the first thing a potential customer sees. We design and build sites, e-commerce, portals and web platforms built for performance and SEO from day one.",
    bullets: ["Corporate websites", "E-commerce", "Client portals", "Web platforms"],
    useCases: [
      "Renew a slow or outdated corporate website.",
      "Launch an online store connected to your real inventory.",
      "Build a portal where your clients track their service.",
      "Develop a custom web platform for your operation.",
    ],
    deliverables: [
      "Experience and interface design",
      "Site or platform development",
      "Performance and technical SEO optimization",
      "Training to manage the content",
    ],
    seo: {
      metaTitle: "Web development and digital platforms",
      metaDescription:
        "We design and build websites, e-commerce, client portals and digital platforms built for performance and SEO.",
    },
  },
};
