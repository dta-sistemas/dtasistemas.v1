/**
 * FIX post-entrega: este archivo nunca se creó en ninguna de las 13 fases
 * anteriores. Sin él, Next.js no invoca el plugin de Tailwind sobre
 * styles/globals.css — las directivas @tailwind base/components/utilities
 * quedaban en el CSS tal cual, sin procesarse, por eso el sitio cargaba
 * pero se veía completamente sin estilos.
 */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
