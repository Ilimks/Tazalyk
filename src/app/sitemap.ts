import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/shared/config/site';
import { newsApi, type News } from '@/entities/news';

// карта сайта пересобирается раз в час, чтобы в неё попадали новые новости
export const revalidate = 3600;

const LOCALES = ['ru', 'ky'] as const;
// API отдаёт посетителям не больше 20 записей с медиа на страницу
const NEWS_PAGE_SIZE = 20;
const MAX_NEWS_PAGES = 100;

const STATIC_ROUTES = [
  '',
  '/acts',
  '/attendance',
  '/complaints',
  '/contacts',
  '/directorate',
  '/employee',
  '/history',
  '/legislation',
  '/media',
  '/news',
  '/procurement',
  '/services',
  '/shop',
  '/structure',
  '/tariffs',
  '/vacancies',
];

// ссылки на обе языковые версии страницы
const languageAlternates = (path: string) => ({
  languages: Object.fromEntries(LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])),
});

// все новости из API; если API недоступен — карта сайта строится без них
const fetchAllNews = async (): Promise<News[]> => {
  const all: News[] = [];
  try {
    for (let page = 1; page <= MAX_NEWS_PAGES; page++) {
      const { results, next } = await newsApi.getAll(
        { page, page_size: NEWS_PAGE_SIZE },
        { next: { revalidate }, signal: AbortSignal.timeout(10000) }
      );
      all.push(...results);
      if (!next) break;
    }
  } catch (error) {
    console.error('Sitemap: failed to load news', error);
  }
  return all;
};

const newsDate = (news: News) => new Date(news.date || news.created_at);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await fetchAllNews();
  const latestNewsDate = news.length
    ? new Date(Math.max(...news.map((item) => newsDate(item).getTime())))
    : undefined;

  const staticEntries = LOCALES.flatMap((locale) =>
    STATIC_ROUTES.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      // дата меняется только у страниц, где появляется новый контент
      lastModified: route === '' || route === '/news' ? latestNewsDate : undefined,
      changeFrequency:
        route === '' || route === '/news'
          ? ('daily' as const)
          : route === '/shop'
            ? ('weekly' as const)
            : ('monthly' as const),
      priority: route === '' ? 1 : 0.8,
      alternates: languageAlternates(route),
    }))
  );

  const newsEntries = LOCALES.flatMap((locale) =>
    news.map((item) => ({
      url: `${SITE_URL}/${locale}/news/${item.id}`,
      lastModified: newsDate(item),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      alternates: languageAlternates(`/news/${item.id}`),
    }))
  );

  return [...staticEntries, ...newsEntries];
}
