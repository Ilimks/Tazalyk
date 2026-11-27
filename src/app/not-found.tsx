import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NotFoundScene } from "@/widgets/NotFound";
import { currentLocale } from "@/i18n/locale";
import { SiteShell } from "./_shell/SiteShell";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await currentLocale();
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: `${t("notFound.title")} | ${t("siteName")}`,
    description: t("notFound.description"),
    robots: { index: false, follow: true },
  };
}

export default async function NotFound() {
  const locale = await currentLocale();
  return (
    <SiteShell locale={locale}>
      <main>
        <NotFoundScene />
      </main>
    </SiteShell>
  );
}
