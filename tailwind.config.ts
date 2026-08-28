import type { Config } from "tailwindcss";

/**
 * DTA Sistemas — Design tokens
 * Derivados de los mockups aprobados en Fase 0.
 * Regla de uso: el azul es acento, NO color dominante (ver docs/components.md).
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
            900: "#0B1730", // fondo footer, bloques de contraste
            800: "#101F3D", // variante de fondo oscuro
          },
          blue: {
            600: "#1B4DE0", // acento primario: CTAs, links activos, íconos
            100: "#E7EEFD", // fondo de íconos circulares
          },
          gray: {
            50: "#F6F7FA",  // fondo general off-white
            200: "#E4E7EC", // bordes / separadores
            600: "#5B6472", // texto secundario
          },
          black: "#0F1115", // texto principal / headlines
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["3.25rem", { lineHeight: "1.1", fontWeight: "700" }], // 52px
        "display-sm": ["2.75rem", { lineHeight: "1.1", fontWeight: "700" }], // 44px mobile
        h2: ["2.25rem", { lineHeight: "1.2", fontWeight: "700" }], // 36px
        h3: ["1.375rem", { lineHeight: "1.3", fontWeight: "600" }], // 22px
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }], // 18px
        label: [
          "0.8125rem",
          { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0.08em" },
        ], // 13px
      },
      borderRadius: {
        card: "12px",
        input: "8px",
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
