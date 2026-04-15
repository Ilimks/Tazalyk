'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { formatDate } from '@/shared/lib/utils/formatDate';
import { useNews } from '@/features/news/model/useNews';
import styles from './NewsDetail.module.scss';
import mobile from './NewsDetailMobile.module.scss';
import { Loading } from '@/shared/ui/Loading';
import { NewsCard } from '@/entities/news';

interface NewsDetailProps {
    id: string;
    locale: string;
}

export const NewsDetail: React.FC<NewsDetailProps> = ({ id, locale }) => {
    const router = useRouter();
    const { 
        currentNews: news, 
        isLoading: loading, 
        error, 
        loadNewsById, 
        clearCurrent,
        loadNews,
        news: allNews 
    } = useNews();

    // Загружаем текущую новость
    useEffect(() => {
        if (id) {
            loadNewsById(id);
        }
        
        // Очищаем текущую новость при размонтировании
        return () => {
            clearCurrent();
        };
    }, [id, loadNewsById, clearCurrent]);

    // Загружаем все новости для похожих (если нужно)
    useEffect(() => {
        if (allNews.length === 0) {
            loadNews();
        }
    }, [loadNews, allNews.length]);

    // Функция для шаринга
    const handleShare = async () => {
        if (navigator.share && news) {
            try {
                await navigator.share({
                    title: news.title,
                    text: news.description,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback - копируем ссылку в буфер обмена
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('Ссылка скопирована в буфер обмена');
            } catch (error) {
                console.error('Failed to copy:', error);
            }
        }
    };

    // Функция для возврата к списку новостей
    const handleBackToNews = () => {
        router.push(`/${locale}/news`);
    };

    // Получаем похожие новости (исключая текущую)
    const relatedNews = allNews
        .filter((item) => item.id !== id)
        .slice(0, 4);

    if (loading) {
        return (
            <div className={`${styles.newsDetail} ${mobile.newsDetail}`}>
                <div className="container">
                    <div className={styles.loaderContainer}>
                        <Loading/>
                        <p>Загрузка новости...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !news) {
        return (
            <div className={`${styles.newsDetail} ${mobile.newsDetail}`}>
                <div className="container">
                    <div className={styles.errorContainer}>
                        <div className={styles.errorIcon}>
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="16" r="1" fill="currentColor"/>
                            </svg>
                        </div>
                        <h2 className={styles.errorTitle}>Новость не найдена</h2>
                        <p className={styles.errorText}>
                            {error || 'Запрашиваемая новость не существует или была удалена'}
                        </p>
                        <button onClick={handleBackToNews} className={styles.backBtn}>
                            Вернуться к списку новостей
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const displayDate = news.date || news.created_at;
    const imageUrl = news.image || "/assets/images/placeholder-news.jpg";

    return (
        <div className={`${styles.newsDetail} ${mobile.newsDetail}`}>
            <div className="container">
                <article className={styles.article}>
                    <div className={styles.imageWrapper}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={imageUrl}
                                alt={news.title}
                                fill
                                className={styles.mainImage}
                                priority
                                sizes="(max-width: 768px) 100vw, 1200px"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/assets/images/placeholder-news.jpg";
                                }}
                            />
                        </div>
                        <div className={styles.imageOverlay}>
                            <div className={styles.badge}>Новость</div>
                        </div>
                    </div>

                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <time className={styles.date}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                                {formatDate(displayDate)}
                            </time>
                            <h1 className={styles.title}>{news.title}</h1>
                        </div>

                        <div className={styles.description}>
                            <p>{news.description}</p>
                        </div>

                        <div className={styles.actions}>
                            <button onClick={handleShare} className={styles.shareBtn}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" stroke="currentColor" strokeWidth="2"/>
                                    <polyline points="16 6 12 2 8 6" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                                Поделиться
                            </button>
                        </div>
                    </div>
                </article>

                {relatedNews.length > 0 && (
                    <div className={styles.relatedSection}>
                        <div className={styles.relatedHeader}>
                            <h3 className={styles.relatedTitle}>Похожие новости</h3>
                            <div className={styles.relatedUnderline}></div>
                        </div>
                        <div className={styles.relatedGrid}>
                            {relatedNews.map((item) => (
                                <NewsCard key={item.id} news={item} variant="compact" />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};