import { NewsDetailPage } from "@/features/news/ui/NewsDetailPage/NewsDetailPage";

interface NewsDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewsDetail({ params }: NewsDetailProps) {
  const { id } = await params;
  
  return (
    <main>
      <NewsDetailPage id={id} />
    </main>
  );
}