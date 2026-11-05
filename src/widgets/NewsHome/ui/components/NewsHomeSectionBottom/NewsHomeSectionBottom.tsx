'use client'
import { useEffect, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { NewsCard, type News } from '@/entities/news';
import { useNews } from '@/features/news/model/useNews';
import { ErrorState } from '@/shared/ui/ErrorState';
import { LoadingState } from '@/shared/ui/LoadingState';
import { EmptyState } from '@/shared/ui/EmptyState';
import styles from './NewsHomeSectionBottom.module.scss';
import mobile from './NewsHomeSectionBottomMobile.module.scss';

interface NewsHomeSectionBottomProps {
    // новости с сервера; null — сервер не смог их загрузить, грузим в браузере
    initialNews: News[] | null;
}

export const NewsHomeSectionBottom: React.FC<NewsHomeSectionBottomProps> = ({ initialNews }) => {
    const t = useTranslations('LoadErrors');
    const { news: loadedNews, isLoading: isLoadingNews, isSuccess, error, loadNews } = useNews();
    const hasLoadedRef = useRef(false);
    const loadOnClient = initialNews === null;

    useEffect(() => {
        if (loadOnClient && !hasLoadedRef.current) {
            hasLoadedRef.current = true;
            loadNews();
        }
    }, [loadOnClient, loadNews]);

    const news = loadOnClient ? loadedNews : initialNews;
    // до первого ответа в браузере показываем загрузку, а не «новостей нет»
    const isLoading = loadOnClient && (isLoadingNews || (!isSuccess && !error));

    const latestNews = useMemo(() => {
        const safeNews = Array.isArray(news) ? news : [];
        
        return [...safeNews]
            .sort((a, b) => {
                const dateA = new Date(a?.date || a?.created_at || 0);
                const dateB = new Date(b?.date || b?.created_at || 0);
                return dateB.getTime() - dateA.getTime();
            })
            .slice(0, 4);
    }, [news]);

    if (isLoading && latestNews.length === 0) {
        return (
            <div className={`${styles.newsHomeBottom} ${mobile.newsHomeBottom}`}>
                <LoadingState />
            </div>
        );
    }
    
    if (loadOnClient && error && latestNews.length === 0) {
        let errorTitle = t('news.title');
        let errorMessage = error;

        if (error.includes("404")) {
            errorTitle = t('news.notFoundTitle');
            errorMessage = t('news.notFoundMessage');
        } else if (error.includes("network") || error.includes("fetch")) {
            errorTitle = t('connectionTitle');
            errorMessage = t('news.connectionMessage');
        } else if (error.includes("timeout")) {
            errorTitle = t('timeoutTitle');
            errorMessage = t('timeoutMessage');
        }
        
        return (
            <div className={`${styles.newsHomeBottom} ${mobile.newsHomeBottom}`}>
                <ErrorState 
                    error={errorMessage}
                    onRetry={loadNews}
                    title={errorTitle}
                    variant="compact"
                />
            </div>
        );
    }

    if (latestNews.length === 0 && !isLoading) {
        return (
            <div className={`${styles.newsHomeBottom} ${mobile.newsHomeBottom}`}>
                <EmptyState variant="news" />
            </div>
        );
    }

    return (
        <div className={`${styles.newsHomeBottom} ${mobile.newsHomeBottom}`}>
            {latestNews.map((item) => (
                <NewsCard key={item.id} news={item} variant="compact" />
            ))}
        </div>
    );
};