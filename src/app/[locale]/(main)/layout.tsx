import type { Metadata } from "next";
import { Footer } from "@/widgets/Footer/ui/Footer";
import { Header } from "@/widgets/Header/ui/Header";
import { PageTransitionProvider } from "./providers/PageTransitionProvider";
import { StoreProvider } from "@/providers/StoreProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ReactNode } from "react";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Тазалык — Чистота и порядок",
  description: "Профессиональные услуги по уборке и наведению порядка.",
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

  const messages = await getMessages();

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