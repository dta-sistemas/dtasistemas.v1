import type { Config } from "tailwindcss";

/**
 * DTA Sistemas — Design tokens
 * Derivados de los mockups aprobados en Fase 0.
 * Regla de uso: el azul es acento, NO color dominante (ver docs/components.md).
 *
 * Rediseño UI/UX: la paleta NO cambia (azul marino, negro, blanco, grises +
 * azul de acento). Solo se completan las escalas con tonos intermedios para
 * poder crear jerarquía (hover, bordes, texto deshabilitado, fondos oscuros
 * en capas) sin recurrir a colores por defecto de Tailwind (ej. `blue-700`,
 * `blue-300`, `blue-950`), que sí rompían la coherencia de marca.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dta: {
          navy: {
            950: "#070F20", // capas más profundas sobre navy (degradados, sombras)
            900: "#0B1730", // fondo footer, bloques de contraste
            800: "#101F3D", // variante de fondo oscuro
            700: "#1A2B52", // superficies elevadas sobre navy
          },
          blue: {
            700: "#1640BF", // hover/pressed del acento primario
            600: "#1B4DE0", // acento primario: CTAs, links activos, íconos
            300: "#9DB5F7", // acento legible SOBRE fondos navy (600 no contrasta)
            100: "#E7EEFD", // fondo de íconos circulares
            50: "#F3F6FE", // tinte muy suave para hover de filas/tarjetas
          },
          gray: {
            50: "#F6F7FA", // fondo general off-white
            100: "#EEF0F4", // hover de superficies claras
            200: "#E4E7EC", // bordes / separadores
            300: "#CBD0D9", // bordes enfatizados, líneas de proceso
            400: "#9AA2B0", // texto deshabilitado / placeholders
            600: "#5B6472", // texto secundario
            700: "#3E4654", // texto secundario de mayor contraste
          },
          black: "#0F1115", // texto principal / headlines
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["3.25rem", { lineHeight: "1.08", fontWeight: "700", letterSpacing: "-0.025em" }], // 52px
        "display-sm": ["2.5rem", { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.02em" }], // 40px mobile
        // h1 de páginas internas: fluido 32px → 44px (antes display-sm fijo a 40px en móvil y h2 de 36px en desktop: el h1 era MÁS chico que el display en móvil y casi igual al h2).
        h1: ["clamp(2rem, 1.45rem + 2.3vw, 2.75rem)", { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.025em" }],
        // h2 fluido: 28px en móvil → 36px en escritorio (antes era fijo y,
        // combinado con display-sm, el h2 de móvil era MÁS grande que el de desktop).
        h2: ["clamp(1.75rem, 1.35rem + 1.6vw, 2.25rem)", { lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.02em" }],
        h3: ["1.25rem", { lineHeight: "1.3", fontWeight: "600", letterSpacing: "-0.01em" }], // 20px
        "body-lg": ["1.125rem", { lineHeight: "1.65", fontWeight: "400" }], // 18px
        label: [
          "0.75rem",
          { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0.12em" },
        ], // 12px
      },
      borderRadius: {
        card: "16px",
        input: "10px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,23,48,0.04), 0 1px 3px rgba(11,23,48,0.06)",
        "card-hover": "0 18px 40px -12px rgba(11,23,48,0.22), 0 4px 10px -4px rgba(11,23,48,0.08)",
        nav: "0 1px 0 rgba(11,23,48,0.06), 0 12px 24px -16px rgba(11,23,48,0.22)",
        glow: "0 0 0 1px rgba(157,181,247,0.25), 0 0 40px -4px rgba(27,77,224,0.55)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        dash: {
          to: { strokeDashoffset: "-8" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.55" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.25s ease-out both",
        float: "float 5s ease-in-out infinite",
        dash: "dash 1.2s linear infinite",
        "pulse-ring": "pulse-ring 2.8s ease-out infinite",
      },
      maxWidth: {
        container: "1280px",
      },
      spacing: {
        "section-y": "6rem", // 96px — separación vertical estándar entre secciones
      },
    },
  },
  plugins: [],
};

export default config;
