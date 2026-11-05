import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Footer } from "@/widgets/Footer/ui/Footer";
import { Header } from "@/widgets/Header/ui/Header";
import { SideAds, InlineAd } from "@/widgets/Ads";
import { NavigationProgress } from "@/shared/ui/NavigationProgress";
import { HtmlLang } from "./providers/HtmlLang";
import { StoreProvider } from "@/providers/StoreProvider";
import { CartPersistence } from "@/features/cart";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL, ORGANIZATION } from "@/shared/config/site";
import { JsonLd } from "@/shared/ui/JsonLd";
import { ReactNode } from "react";
import { notFound } from "next/navigation";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#102382",
};

// тексты (title, description, openGraph, twitter) — в generateMetadata из сообщений Metadata
const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  category: "government",
  classification: "Municipal Enterprise",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: [
      { url: "/assets/favicon.ico", sizes: "any" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/assets/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/assets/site.webmanifest",
  appleWebApp: {
    title: "Тазалык",
    statusBarStyle: "black-translucent",
  },
  other: {
    "msapplication-TileColor": "#102382",
  },
};

// Разделы сайта со своими заголовками и описаниями: messages → Metadata.pages.<раздел>
const PAGE_KEYS = [
  "history",
  "structure",
  "directorate",
  "services",
  "vacancies",
  "tariffs",
  "complaints",
  "employee",
  "attendance",
  "news",
  "media",
  "procurement",
  "legislation",
  "acts",
  "contacts",
  "shop",
  "cart",
  "search",
] as const;

const getPageKey = (pathWithoutLocale: string) => {
  const section = pathWithoutLocale.split("/")[1] ?? "";
  return (PAGE_KEYS as readonly string[]).includes(section) ? section : null;
};

const OG_IMAGE = "/assets/og-image.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  // x-pathname выставляет middleware, например "/ky/news". На адресах, где middleware не работает,
  // заголовок мог прислать сам посетитель — принимаем только обычный путь сайта
  const rawPathname = (await headers()).get("x-pathname") ?? "";
  const pathname = /^\/(ru|ky)(\/[\w\-/]*)?$/.test(rawPathname) ? rawPathname : `/${locale}`;
  const pathWithoutLocale = pathname.replace(/^\/(ru|ky)(?=\/|$)/, "");
  const url = `${SITE_URL}${pathname}`;

  // у каждого раздела свой заголовок и описание; главная и прочие страницы — общие
  const pageKey = getPageKey(pathWithoutLocale);
  const title = pageKey ? `${t(`pages.${pageKey}.title`)} | ${t("siteName")}` : t("title");
  const description = pageKey ? t(`pages.${pageKey}.description`) : t("description");
  const shareTitle = pageKey ? title : t("ogTitle");
  const shareDescription = pageKey ? description : t("ogDescription");

  return {
    ...baseMetadata,
    title,
    description,
    keywords: t("keywords"),
    authors: [{ name: t("siteName") }],
    creator: t("siteName"),
    publisher: t("siteName"),
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: pageKey ? description : t("twitterDescription"),
      images: [OG_IMAGE],
    },
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru${pathWithoutLocale}`,
        ky: `${SITE_URL}/ky${pathWithoutLocale}`,
        "x-default": `${SITE_URL}/ru${pathWithoutLocale}`,
      },
    },
    openGraph: {
      title: shareTitle,
      description: shareDescription,
      siteName: t("siteName"),
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
      type: "website",
      url,
      locale: locale === "ky" ? "ky_KG" : "ru_RU",
      alternateLocale: locale === "ky" ? ["ru_RU"] : ["ky_KG"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const organization = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: t("siteName"),
    alternateName: "Тазалык",
    description: t("description"),
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/assets/icon-512.png`,
    image: `${SITE_URL}${OG_IMAGE}`,
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION.street[locale],
      addressLocality: ORGANIZATION.city[locale],
      addressCountry: "KG",
    },
    areaServed: { "@type": "City", name: ORGANIZATION.city[locale] },
    sameAs: ORGANIZATION.social,
  };

  return (
    <StoreProvider>
      <JsonLd data={organization} />
      <HtmlLang locale={locale} />
      {/* корзина магазина ↔ localStorage, читается только в браузере после монтирования */}
      <CartPersistence />
      <NavigationProgress />
      <NextIntlClientProvider>
        <Header />
        <SideAds>{children}</SideAds>
        <InlineAd />
        <Footer />
      </NextIntlClientProvider>
    </StoreProvider>
  );
}