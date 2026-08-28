import createNextIntlPlugin from "next-intl/plugin";

/**
 * FIX post-entrega: faltaba conectar next-intl con next.config — sin esto,
 * next-intl no encuentra i18n/request.ts y el layout raíz falla con
 * "Couldn't find next-intl config file" en cuanto intenta cargar mensajes.
 */
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const isDev = process.env.NODE_ENV !== "production";

/**
 * FIX post-entrega: en desarrollo, Next.js necesita eval() para el Hot
 * Module Reload (React Refresh) — sin 'unsafe-eval' en script-src, el
 * navegador bloquea la ejecución del runtime de desarrollo y TODO el
 * JavaScript del cliente deja de funcionar (formularios en blanco, botones
 * sin efecto, etc.), aunque el CSS y el HTML se vean bien.
 *
 * 'unsafe-eval' NUNCA se agrega en producción — ahí sí importa la
 * protección real contra XSS que la CSP está pensada para dar.
 */
const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ""}https://www.googletagmanager.com https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://challenges.cloudflare.com",
  "frame-src 'self' https://www.googletagmanager.com https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspDirectives },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
