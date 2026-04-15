import { NewsDetail } from "@/widgets/News/NewsDetail/model";
import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { fetchNewsById } from "@/entities/news/api/newsApi";

interface NewsDetailProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { id, locale } = await params;  // ← получаем locale
  
  let newsTitle = 'Новость';
  try {
    const news = await fetchNewsById(id);
    if (news?.title) {
      newsTitle = news.title.length > 25 
        ? news.title.substring(0, 20) + '...' 
        : news.title;
    }
  } catch (error) {
    console.error('Error fetching news for breadcrumbs:', error);
  }

  const breadcrumbItems = [
    { label: 'Новости', href: `/${locale}/news` },  // ← добавляем locale
    { label: newsTitle, href: `/${locale}/news/${id}` }  // ← добавляем locale
  ];
  
  return (
    <main>
      <BreadcrumbsWidget customItems={breadcrumbItems} />
      <NewsDetail id={id} locale={locale}/>
    </main>
  );
}