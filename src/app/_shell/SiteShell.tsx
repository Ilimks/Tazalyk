import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Footer } from "@/widgets/Footer/ui/Footer";
import { Header } from "@/widgets/Header/ui/Header";
import { SideAds, InlineAd } from "@/widgets/Ads";
import { WinterEffects, getWinterEnabled } from "@/widgets/Winter";
import { NavigationProgress } from "@/shared/ui/NavigationProgress";
import { RevealOnScroll } from "@/shared/ui/RevealOnScroll";
import { JsonLd } from "@/shared/ui/JsonLd";
import { StoreProvider } from "@/providers/StoreProvider";
import { CartPersistence } from "@/features/cart";
import { SITE_URL, ORGANIZATION, OG_IMAGE } from "@/shared/config/site";
import type { Locale } from "@/i18n/locale";
import { HtmlLang } from "./HtmlLang";

export async function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const winter = await getWinterEnabled();
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
      <CartPersistence />
      <NavigationProgress />
      <NextIntlClientProvider>
        <RevealOnScroll />
        <div data-winter={winter ? "" : undefined} style={{ display: "contents" }}>
          <Header />
          <SideAds>{children}</SideAds>
          <InlineAd />
          <Footer />
          <WinterEffects enabled={winter} />
        </div>
      </NextIntlClientProvider>
    </StoreProvider>
  );
}
