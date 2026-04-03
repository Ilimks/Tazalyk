import { NewsDetailPage } from "@/features/news/ui/NewsDetailPage/NewsDetailPage"; 

interface NewsDetailProps {
  params: {
    id: string;
  };
}

export default function NewsDetail({ params }: NewsDetailProps) {
  return (
    <main>
      <NewsDetailPage id={params.id} />
    </main>
  );
}