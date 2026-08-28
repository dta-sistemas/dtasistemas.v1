export type SectorTranslation = {
  name: string;
  tags: string[];
  headline: string;
  heroDescription: string;
  problems: string[];
  /** Mismo orden/slugs que relatedSolutions en data/sectors.ts — solo traduce el "angle". */
  relatedSolutionsAngles: string[];
  seo: { metaTitle: string; metaDescription: string };
};

export const sectorsEn: Record<string, SectorTranslation> = {
  turismo: {
    name: "Tourism",
    tags: ["Bookings", "Operations", "Integration", "Data"],
    headline: "Your tourism operation deserves systems as dynamic as your demand.",
    heroDescription:
      "Bookings, availability, inventory and customer data change every day. We design the systems that let your team operate at that speed, without relying on spreadsheets or copying information between platforms.",
    problems: [
      "Availability and inventory that don't sync in real time across channels and OTAs.",
      "Bookings managed manually across OTAs, WhatsApp and your own site.",
      "Occupancy and sales reports built by hand every week.",
      "Customer data scattered across bookings, sales and support.",
    ],
    relatedSolutionsAngles: [
      "Booking systems built for your operation.",
      "Integration between OTAs, sales channels and your internal system.",
      "Occupancy and sales dashboards in real time.",
    ],
    seo: {
      metaTitle: "Technology for tourism businesses",
      metaDescription: "Booking systems, OTA integration and occupancy dashboards for tourism businesses in Quintana Roo and Yucatán.",
    },
  },
  hoteleria: {
    name: "Hospitality",
    tags: ["Operations", "Data", "Integration"],
    headline: "Your PMS shouldn't be just another island in your operation.",
    heroDescription:
      "Between the PMS, the channel manager, housekeeping and revenue management, a hotel's information lives spread across several systems that almost never talk to each other. We connect those pieces so your team has one single version of the truth.",
    problems: [
      "The channel manager and the PMS don't sync rates and availability automatically.",
      "Housekeeping is coordinated by radio or WhatsApp, with no traceability in the system.",
      "Revenue management is decided by gut feeling, without accessible historical data.",
      "Guest experience (pre-checkin, surveys, upsells) stays outside the central system.",
    ],
    relatedSolutionsAngles: [
      "Sync between PMS, channel manager and booking engine.",
      "RevPAR, occupancy and seasonal performance dashboards.",
      "Automated guest communication before and during their stay.",
    ],
    seo: {
      metaTitle: "Hotel systems: PMS, channel manager and data",
      metaDescription: "We integrate PMS, channel manager and revenue management, and build occupancy dashboards for hotel chains and independents.",
    },
  },
  inmobiliario: {
    name: "Real Estate",
    tags: ["Leads", "CRM", "Automation", "Follow-up"],
    headline: "Every lead you don't follow up on in time, a competitor picks up.",
    heroDescription:
      "In real estate the decision cycle is long, and follow-up is everything. We build the CRM and automation that make sure no prospect gets lost between the listing portal, WhatsApp and the agent's spreadsheet.",
    problems: [
      "Leads from real estate portals arrive by email and nobody follows up in time.",
      "Each agent keeps their own spreadsheet of prospects, with no visibility for the sales team.",
      "Property files and legal documentation scattered across folders and emails.",
      "No way to know which channel (portal, social, referrals) actually closes sales.",
    ],
    relatedSolutionsAngles: [
      "Real estate CRM with prospect and property follow-up.",
      "Automated response and qualification of incoming leads.",
      "Lead source and per-agent performance reports.",
    ],
    seo: {
      metaTitle: "CRM and automation for real estate agencies",
      metaDescription: "Real estate CRM, automated lead follow-up and sales performance reports for agencies and developers.",
    },
  },
  servicios: {
    name: "Service Businesses",
    tags: ["Processes", "CRM", "Automation", "Intelligence"],
    headline: "Your service is good. The operation behind it, not yet.",
    heroDescription:
      "Quoting, scheduling, following up and invoicing usually live in different tools nobody connected on purpose. We put that flow in order so your team spends less time administering and more time delivering the service.",
    problems: [
      "Quotes and proposals built manually every time, with no template or version control.",
      "Service scheduling coordinated by chat, with double-booking risk.",
      "Invoicing disconnected from the system where customers are tracked.",
      "No visibility into which clients are up for renewal or at risk of leaving.",
    ],
    relatedSolutionsAngles: [
      "CRM and service scheduling in one place.",
      "Automated quotes, reminders and invoicing.",
      "Retention, renewal and per-client performance reports.",
    ],
    seo: {
      metaTitle: "Systems for service businesses",
      metaDescription: "CRM, quote and invoicing automation, and customer retention reports for B2B service businesses.",
    },
  },
};
