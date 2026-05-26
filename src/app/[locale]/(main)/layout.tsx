import type { Metadata } from "next";
import { Footer } from "@/widgets/Footer/ui/Footer";
import { Header } from "@/widgets/Header/ui/Header";
import { PageTransitionProvider } from "./providers/PageTransitionProvider";
import { StoreProvider } from "@/providers/StoreProvider";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { ReactNode } from "react";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Тазалык — Чистота начинается с тебя | Официальный сайт",
  description: "МП «Тазалык» — профессиональные услуги по уборке, вывозу мусора и благоустройству в Бишкеке. Чистота города начинается с тебя! Официальный сайт, график приема, подача жалоб.",
  keywords: "Тазалык, чистота, порядок, уборка, вывоз мусора, благоустройство, Бишкек, коммунальные услуги",
  authors: [{ name: "МП «Тазалык»" }],
  creator: "МП «Тазалык»",
  publisher: "МП «Тазалык»",
  robots: "index, follow",
  alternates: {
    canonical: "https://tazalyk.kg",
    languages: {
      'ru': 'https://tazalyk.kg/ru',
      'kg': 'https://tazalyk.kg/kg',
      'en': 'https://tazalyk.kg/en',
    },
  },
  openGraph: {
    title: "Тазалык — Чистота и порядок начинается с тебя",
    description: "Профессиональные услуги по уборке, вывозу мусора и благоустройству в Бишкеке. Чистота города начинается с тебя!",
    url: "https://tazalyk.kg",
    siteName: "МП «Тазалык»",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "МП «Тазалык» — Чистота и порядок",
      },
    ],
    locale: "ru_RU",
    alternateLocale: ["kg_KG", "en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Тазалык — Чистота и порядок начинается с тебя",
    description: "Профессиональные услуги по уборке, вывозу мусора и благоустройству в Бишкеке",
    images: ["/assets/twitter-image.jpg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "ваш-google-verification-код",
    yandex: "ваш-yandex-verification-код",
  },
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
    other: [
      {
        rel: "mask-icon",
        url: "/assets/safari-pinned-tab.svg",
        color: "#102382",
      },
    ],
  },
  manifest: "/assets/site.webmanifest",
  appleWebApp: {
    title: "Тазалык",
    statusBarStyle: "black-translucent",
    startupImage: [
      "/assets/apple-splash-2048-2732.jpg",
    ],
  },
  other: {
    "msapplication-TileColor": "#102382",
    "msapplication-config": "/assets/browserconfig.xml",
    "theme-color": "#102382",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <StoreProvider>
      <PageTransitionProvider>
        <NextIntlClientProvider>
          <Header />
            {children}
          <Footer />
        </NextIntlClientProvider>
      </PageTransitionProvider>
    </StoreProvider>
  );
}