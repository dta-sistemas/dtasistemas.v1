export type ProjectTranslation = {
  sectorLabel: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  seo: { metaTitle: string; metaDescription: string };
};

export const projectsEn: Record<string, ProjectTranslation> = {
  "plataforma-de-reservas": {
    sectorLabel: "Tourism",
    title: "Booking Platform",
    summary: "Centralized availability, bookings and inventory with integration across multiple sales channels.",
    problem:
      "The team managed availability and inventory by hand across different OTAs, their own site, and WhatsApp. This caused occasional overbooking and occupancy reports that reached leadership out of date.",
    solution:
      "A central booking system was designed, connected to sales channels via APIs, with automatic real-time sync of availability, rates and inventory.",
    result:
      "Eliminated overbooking caused by desync, and occupancy reports now available in real time for leadership, with no manual reporting needed.",
    seo: {
      metaTitle: "Booking Platform — Case study",
      metaDescription: "How we centralized availability, bookings and multi-channel inventory for a tourism business, eliminating overbooking.",
    },
  },
  "sistema-de-captacion": {
    sectorLabel: "Real Estate",
    title: "Lead Capture System",
    summary: "Automated prospect follow-up and sales management with real-time reporting.",
    problem:
      "Leads arriving from real estate portals were distributed by email among agents, who then followed up in individual spreadsheets. There was no visibility into which prospects were falling through the cracks or which channel actually generated sales.",
    solution:
      "A CRM was implemented with automatic lead capture from portals and the company's own site, automatic assignment by agent, and follow-up reminders configured by funnel stage.",
    result: "Full visibility of the sales funnel for leadership, and reduced time to first contact with each prospect.",
    seo: {
      metaTitle: "Real Estate Lead Capture System — Case study",
      metaDescription: "Automated prospect follow-up and sales management for a real estate agency, with real-time reporting.",
    },
  },
  "business-intelligence": {
    sectorLabel: "Services",
    title: "Business Intelligence",
    summary: "Consolidated information and executive dashboards for better decision-making.",
    problem:
      "Business information lived spread across the invoicing system, the CRM and individual spreadsheets per department. Building an executive report took days, and by the time it was ready the data was already outdated.",
    solution:
      "Data sources were consolidated into a single executive dashboard, with KPIs defined together with leadership and automatic updates from the source systems.",
    result:
      "Leadership went from receiving manual weekly reports to having their key KPIs available in real time, with alerts when a metric goes out of range.",
    seo: {
      metaTitle: "Business Intelligence for a Services Company — Case study",
      metaDescription: "Consolidating scattered information into a single executive dashboard for a B2B services company.",
    },
  },
  "integracion-de-sistemas": {
    sectorLabel: "Tourism",
    title: "System Integration",
    summary: "Multiple platforms connected via APIs to sync data and processes.",
    problem:
      "The booking system, the accounting system and the customer support platform operated in isolation. The team had to enter the same information up to three times across different systems.",
    solution:
      "API connectors were built between the three platforms, with automatic two-way sync of bookings, invoicing and customer data.",
    result: "Eliminated double (and triple) data entry, reducing human error and freeing up hours of admin team time every week.",
    seo: {
      metaTitle: "System Integration for a Tourism Business — Case study",
      metaDescription: "Connecting bookings, accounting and customer support via APIs to eliminate double data entry.",
    },
  },
};
