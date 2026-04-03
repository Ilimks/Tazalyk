'use client'
import { useEffect, useState } from 'react';
import { NewsCard } from '@/entities/news/ui/NewsCard';
import { News } from '@/entities/news/model/types';
import { api } from '@/shared/api/api';
import styles from './NewsHomeSectionBottom.module.scss';
import mobile from './NewsHomeSectionBottomMobile.module.scss';
import { Loading } from '@/shared/ui/Loading';

export const NewsHomeSectionBottom: React.FC = () => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('NewsHomeSectionBottom mounted, loading news...');
        loadNews();
    }, []);

    const loadNews = async () => {
        try {
            setLoading(true);
            console.log('Calling api.getNews()...');
            const data = await api.getNews();
            console.log('Received data:', data);
            console.log('Number of news items:', data.length);
            
            // Sort news by date (newest first) and take only first 4 items
            const sortedNews = [...data].sort((a, b) => {
                // Assuming news objects have a 'date' or 'createdAt' field
                // Adjust the field name based on your actual data structure
                const dateA = new Date(a.date || a.createdAt || 0);
                const dateB = new Date(b.date || b.createdAt || 0);
                return dateB.getTime() - dateA.getTime();
            });
            
            const latestNews = sortedNews.slice(0, 4);
            console.log('Showing latest 4 news:', latestNews.length);
            
            setNews(latestNews);
            setError(null);
        } catch (err) {
            console.error('Error loading news:', err);
            setError('Не удалось загрузить новости');
        } finally {
            setLoading(false);
        }
    };

    console.log('Rendering NewsHomeSectionBottom, loading:', loading, 'news count:', news.length);

    if (loading) {
        return (
            <div className={`${styles.newsHomeBottom} ${mobile.newsHomeBottom}`}>
                <div className={styles.loader}>
                    <Loading/>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${styles.newsHomeBottom} ${mobile.newsHomeBottom}`}>
                <div className={styles.error}>
                    <p>{error}</p>
                    <button onClick={loadNews} className={styles.retryBtn}>
                        Попробовать снова
                    </button>
                </div>
            </div>
        );
    }

    if (news.length === 0) {
        return (
            <div className={`${styles.newsHomeBottom} ${mobile.newsHomeBottom}`}>
                <div className={styles.empty}>
                    <p>Новостей пока нет</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.newsHomeBottom} ${mobile.newsHomeBottom}`}>
            {news.map((item) => (
                <NewsCard key={item.id} news={item} variant="compact" />
            ))}
        </div>
    );
};