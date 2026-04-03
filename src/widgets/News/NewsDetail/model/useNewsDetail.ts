import { useState, useEffect } from 'react';
import { api } from '@/shared/api/api';
import { News } from '@/entities/news/model/types';

export const useNewsDetail = (id: string) => {
    const [news, setNews] = useState<News | null>(null);
    const [relatedNews, setRelatedNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadNewsDetail = async () => {
        try {
            setLoading(true);
            const allNews = await api.getNews();
            const currentNews = allNews.find((item: News) => item.id.toString() === id);
            
            if (currentNews) {
                setNews(currentNews);
                const otherNews = allNews
                    .filter((item: News) => item.id.toString() !== id)
                    .slice(0, 3);
                setRelatedNews(otherNews);
            } else {
                setError('Новость не найдена');
            }
        } catch (err) {
            console.error('Error loading news detail:', err);
            setError('Не удалось загрузить новость');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            loadNewsDetail();
        }
    }, [id]);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: news?.title,
                text: news?.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Ссылка скопирована в буфер обмена');
        }
    };

    return {
        news,
        relatedNews,
        loading,
        error,
        handleShare,
        refetch: loadNewsDetail
    };
};