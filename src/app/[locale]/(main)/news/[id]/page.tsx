import { NewsDetail } from "@/widgets/News/ui/components/NewsDetail";
import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { fetchNewsById } from "@/entities/news/api/newsApi";

interface NewsDetailProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { id, locale } = await params;
  
  let newsTitle = locale === 'ky' ? 'Жаңылык' : 'Новость';
  try {
    const news = await fetchNewsById(id, locale);
    const title = locale === 'ky' ? news?.title_ky : news?.title_ru;
    if (title) {
      newsTitle = title.length > 25 
        ? title.substring(0, 20) + '...' 
        : title;
    }
  } catch (error) {
    console.error('Error fetching news for breadcrumbs:', error);
  }

  const breadcrumbItems = [
    { 
      label: locale === 'ky' ? 'Жаңылыктар' : 'Новости', 
      href: `/${locale}/news` 
    },
    { 
      label: newsTitle, 
      href: `/${locale}/news/${id}` 
    }
  ];
  
  return (
    <main>
      <BreadcrumbsWidget />
      <NewsDetail id={id} />
    </main>
  );
}