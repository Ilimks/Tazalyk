export interface News {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  publishedAt: string;
  category: string;
}

export interface NewsApiResponse {
  news: News[];
  total: number;
}