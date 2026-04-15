import { NewsDetail } from "@/widgets/News/NewsDetail/model";
import { BreadcrumbsWidget } from "@/widgets/BreadcrumbsWidget";
import { fetchNewsById } from "@/entities/news/api/newsApi";

interface NewsDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { id } = await params;
  
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
    { label: 'Новости', href: '/news' },
    { label: newsTitle, href: `/news/${id}` }
  ];
  
  return (
    <main>
      <BreadcrumbsWidget customItems={breadcrumbItems} />
      <NewsDetail id={id} />
    </main>
  );
}