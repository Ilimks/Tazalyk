'use client'
import { useEffect, useRef } from 'react';
import { NewsCard } from '@/entities/news/ui/NewsCard';
import { useNews } from '@/features/news/model/useNews';
import { ErrorState } from '@/shared/ui/ErrorState';
import styles from './NewsHomeSectionBottom.module.scss';
import mobile from './NewsHomeSectionBottomMobile.module.scss';
import { LoadingState } from '@/shared/ui/LoadingState';

export const NewsHomeSectionBottom: React.FC = () => {
    const { news, isLoading, error, loadNews } = useNews();
    const hasLoadedRef = useRef(false);

    useEffect(() => {
        if (!hasLoadedRef.current && !isLoading) {
            hasLoadedRef.current = true;
            loadNews();
        }
    }, [loadNews, isLoading]);

    // Защита от undefined
    const safeNews = Array.isArray(news) ? news : [];

    // Получаем последние 4 новости
    const latestNews = [...safeNews]
        .sort((a, b) => {
            const dateA = new Date(a?.date || a?.created_at || 0);
            const dateB = new Date(b?.date || b?.created_at || 0);
            return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 4);

    // Состояние загрузки
    if (isLoading && safeNews.length === 0) {
        return (
            <div className={`${styles.newsHomeBottom} ${mobile.newsHomeBottom}`}>
                <LoadingState />
            </div>
        );
    }
    
    if (error && safeNews.length === 0) {
        let errorTitle = "Ошибка загрузки новостей";
        let errorMessage = error;
        
        if (error.includes("404")) {
            errorTitle = "Новости не найдены";
            errorMessage = "Раздел новостей временно недоступен. Пожалуйста, попробуйте позже.";
        } else if (error.includes("network") || error.includes("fetch")) {
            errorTitle = "Проблема с соединением";
            errorMessage = "Не удается загрузить последние новости. Проверьте подключение к интернету.";
        } else if (error.includes("timeout")) {
            errorTitle = "Превышено время ожидания";
            errorMessage = "Сервер долго не отвечает. Пожалуйста, попробуйте позже.";
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

    // Состояние пустого списка
    if (latestNews.length === 0 && !isLoading) {
        return (
            <div className={`${styles.newsHomeBottom} ${mobile.newsHomeBottom}`}>
                <div className={styles.empty}>
                    <p>Новостей пока нет</p>
                </div>
            </div>
        );
    }

    // Успешная загрузка с данными
    return (
        <div className={`${styles.newsHomeBottom} ${mobile.newsHomeBottom}`}>
            {latestNews.map((item) => (
                <NewsCard key={item.id} news={item} variant="compact" />
            ))}
        </div>
    );
};