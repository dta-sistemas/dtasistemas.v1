import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GoogleTagManagerScript, GoogleTagManagerNoScript } from "@/components/analytics/GoogleTagManager";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { SITE_URL } from "@/lib/site";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "DTA Sistemas — Partner tecnológico para empresas",
      template: "%s | DTA Sistemas",
    },
    description: t("heroSubtitle"),
    openGraph: {
      siteName: "DTA Sistemas",
      locale: locale === "en" ? "en_US" : "es_MX",
      type: "website",
      images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "DTA Sistemas" }],
    },
    twitter: { card: "summary_large_image", site: "@dtasistemas" },
    verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  };
}

/**
 * True root layout — vive en app/[locale]/layout.tsx (patrón estándar de
 * next-intl, ver docs/i18n.md).
 *
 * FIX post-entrega #1: se reemplazó `hasLocale` (no exportado en la
 * versión de next-intl resuelta por package.json) por una comparación
 * manual contra `routing.locales`.
 *
 * FIX post-entrega #2: <NextIntlClientProvider> no recibía `messages`
 * explícitamente. Casi todas las secciones del sitio son Client Components
 * (necesitan useTranslations por interactividad/hooks), así que dependen
 * enteramente de que el provider les entregue el diccionario. Sin pasarlo,
 * cada t("clave") caía al fallback de next-intl de mostrar la ruta literal
 * de la clave (ej. "home.auditTitle") en vez del texto real — afectaba
 * prácticamente toda la interfaz visible del sitio. Se corrige obteniendo
 * los mensajes con getMessages() (next-intl/server) y pasándolos al
 * provider junto con el locale.
 */
export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <GoogleTagManagerScript />
      </head>
      <body>
        <GoogleTagManagerNoScript />
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
