import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { SITE_URL, OG_IMAGE } from "@/shared/config/site";
import { isLocale } from "@/i18n/locale";
import { SiteShell } from "@/app/_shell/SiteShell";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const rawPathname = (await headers()).get("x-pathname") ?? "";
  const pathname = /^\/(ru|ky)(\/[\w\-/]*)?$/.test(rawPathname) ? rawPathname : `/${locale}`;
  const pathWithoutLocale = pathname.replace(/^\/(ru|ky)(?=\/|$)/, "");
  const url = `${SITE_URL}${pathname}`;

  const pageKey = getPageKey(pathWithoutLocale);
  const title = pageKey ? `${t(`pages.${pageKey}.title`)} | ${t("siteName")}` : t("title");
  const description = pageKey ? t(`pages.${pageKey}.description`) : t("description");
  const shareTitle = pageKey ? title : t("ogTitle");
  const shareDescription = pageKey ? description : t("ogDescription");

  return {
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
  if (!isLocale(locale)) notFound();
  return <SiteShell locale={locale}>{children}</SiteShell>;
}
