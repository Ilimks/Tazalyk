import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { NewsDetail } from "@/widgets/News/ui/components/NewsDetail";
import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import {
  newsApi,
  getNewsTitle,
  getNewsDescription,
  getServerFetchOptions,
} from "@/entities/news";
import { ApiError } from "@/shared/api";
import { SITE_URL } from "@/shared/config/site";
import { JsonLd } from "@/shared/ui/JsonLd";

interface NewsDetailProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

// cache — один запрос к API на generateMetadata и страницу
const getNews = cache(async (id: string) => {
  try {
    return await newsApi.getById(id, getServerFetchOptions());
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
});

const getRelatedNews = async (id: string) => {
  try {
    const { results } = await newsApi.getAll({ page: 1, page_size: 5 }, getServerFetchOptions());
    return results.filter((item) => String(item.id) !== id).slice(0, 4);
  } catch {
    // похожие новости необязательны — страница откроется и без них
    return [];
  }
};

const truncate = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;

export async function generateMetadata({ params }: NewsDetailProps): Promise<Metadata> {
  const { id, locale } = await params;
  const news = await getNews(id);
  // notFound здесь, а не только в странице: так поисковики получают настоящий статус 404
  if (!news) notFound();

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = getNewsTitle(news, locale);
  const description = truncate(getNewsDescription(news, locale) || title, 160);

  return {
    title: `${title} | ${t("siteName")}`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/${locale}/news/${id}`,
      siteName: t("siteName"),
      locale: locale === "ky" ? "ky_KG" : "ru_RU",
      publishedTime: news.date || news.created_at,
      images: news.image ? [{ url: news.image }] : undefined,
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { id, locale } = await params;
  const [news, relatedNews] = await Promise.all([getNews(id), getRelatedNews(id)]);

  if (!news) {
    notFound();
  }

  const title = getNewsTitle(news, locale);
  const article = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description: truncate(getNewsDescription(news, locale) || title, 300),
    datePublished: news.date || news.created_at,
    dateModified: news.created_at || news.date,
    inLanguage: locale,
    mainEntityOfPage: `${SITE_URL}/${locale}/news/${id}`,
    image: news.image ? [news.image] : [`${SITE_URL}/assets/og-image.jpg`],
    publisher: { "@id": `${SITE_URL}/#organization` },
    author: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <main>
      <JsonLd data={article} />
      <BreadcrumbsWidget currentLabel={title} />
      <NewsDetail news={news} relatedNews={relatedNews} />
    </main>
  );
}
