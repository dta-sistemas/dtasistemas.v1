/**
 * Fuente única de verdad para Navbar, Footer y breadcrumbs.
 * Ver Fase 0, sección 6.5. Al agregar una solución o sector nuevo,
 * actualizar aquí y en data/solutions o data/sectors — no en los componentes.
 *
 * Corrección Fase 6:
 * - Se agrega "Blog" a mainNav (estaba en el sitemap de Fase 0, sección 08,
 *   pero no se había incluido en el código desde Fase 2).
 * - Se corrige el href de "Automatización & IA" en footerNav: apuntaba a
 *   /soluciones/automatizacion, pero el slug real definido en Fase 3
 *   (data/solutions.ts) es /soluciones/inteligencia-artificial.
 */

export const mainNav = [
  { label: "Inicio", href: "/" },
  { label: "Soluciones", href: "/soluciones" },
  { label: "Sectores", href: "/sectores" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "DTA", href: "/dta" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

export const footerNav = [
  {
    title: "Soluciones",
    links: [
      { label: "Sistemas", href: "/soluciones/sistemas-empresariales" },
      { label: "Integración", href: "/soluciones/integracion-de-sistemas" },
      { label: "Inteligencia", href: "/soluciones/business-intelligence" },
      { label: "Automatización & IA", href: "/soluciones/inteligencia-artificial" },
      { label: "Desarrollo Digital", href: "/soluciones/desarrollo-digital" },
      { label: "DTA Care", href: "/dta-care" },
    ],
  },
  {
    title: "Sectores",
    links: [
      { label: "Turismo", href: "/sectores/turismo" },
      { label: "Inmobiliario", href: "/sectores/inmobiliario" },
      { label: "Hotelería", href: "/sectores/hoteleria" },
      { label: "Empresas de servicios", href: "/sectores/servicios" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "DTA", href: "/dta" },
      { label: "Proyectos", href: "/proyectos" },
      { label: "Blog", href: "/blog" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
];
