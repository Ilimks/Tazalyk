'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Calendar, Share2 } from 'lucide-react';
import { formatDate } from '@/shared/lib/utils/formatDate';
import { NewsCard, getNewsTitle, getNewsDescription, getNewsDate, type News } from '@/entities/news';
import styles from './NewsDetail.module.scss';
import mobile from './NewsDetailMobile.module.scss';

const PLACEHOLDER_IMAGE = '/assets/images/placeholder-news.svg';

interface NewsDetailProps {
    // новость и похожие новости загружаются на сервере в app/[locale]/(main)/news/[id]/page.tsx
    news: News;
    relatedNews: News[];
}

export const NewsDetail: React.FC<NewsDetailProps> = ({ news, relatedNews }) => {
    const locale = useLocale();
    const t = useTranslations('NewsID');
    const [imageUrl, setImageUrl] = useState(news.image || PLACEHOLDER_IMAGE);

    const title = getNewsTitle(news, locale);
    const description = getNewsDescription(news, locale);
    const dateLocale = locale === 'ky' ? 'ky-KG' : 'ru-RU';

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, text: description, url: window.location.href });
            } catch {
                // пользователь закрыл окно «Поделиться»
            }
            return;
        }

        try {
            await navigator.clipboard.writeText(window.location.href);
            alert(t('NewsLinkCopied'));
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <div className={`${styles.newsDetail} ${mobile.newsDetail}`}>
            <div className="container">
                <article className={styles.article}>
                    <div className={styles.imageWrapper}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={imageUrl}
                                alt={title}
                                fill
                                className={styles.mainImage}
                                priority
                                sizes="(max-width: 768px) 100vw, 1200px"
                                onError={() => setImageUrl(PLACEHOLDER_IMAGE)}
                            />
                        </div>
                        <div className={styles.imageOverlay}>
                            <div className={styles.badge}>{t('NewsBadge')}</div>
                        </div>
                    </div>

                    <div className={styles.contentWrapper}>
                        <div className={styles.header}>
                            <time className={styles.date} dateTime={getNewsDate(news)}>
                                <Calendar size={16} aria-hidden />
                                {formatDate(getNewsDate(news), { format: 'long', locale: dateLocale })}
                            </time>
                            <h1 className={styles.title}>{title}</h1>
                        </div>

                        <div className={styles.description}>
                            <p>{description}</p>
                        </div>

                        <div className={styles.actions}>
                            <button onClick={handleShare} className={styles.shareBtn}>
                                <Share2 size={20} aria-hidden />
                                {t('NewsShare')}
                            </button>
                        </div>
                    </div>
                </article>

                {relatedNews.length > 0 && (
                    <div className={styles.relatedSection}>
                        <div className={styles.relatedHeader}>
                            <h3 className={styles.relatedTitle}>{t('NewsSimilar')}</h3>
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
