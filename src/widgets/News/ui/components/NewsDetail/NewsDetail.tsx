'use client';
import { HomeSectionHeader } from '@/shared/ui/HomeSectionHeader';
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
                    <header className={styles.header}>
                        <div className={styles.meta}>
                            <span className={styles.badge}>{t('NewsBadge')}</span>
                            <time className={styles.date} dateTime={getNewsDate(news)}>
                                <Calendar size={16} aria-hidden />
                                {formatDate(getNewsDate(news), { format: 'long', locale: dateLocale })}
                            </time>
                        </div>
                        <h1 className={styles.title}>{title}</h1>
                    </header>

                    <div className={styles.imageContainer}>
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className={styles.mainImage}
                            priority
                            sizes="(max-width: 900px) 100vw, 860px"
                            onError={() => setImageUrl(PLACEHOLDER_IMAGE)}
                        />
                    </div>

                    {/* абзацы новости разделены переводом строки: раньше текст сливался в один */}
                    <div className={styles.description}>
                        <p>{description}</p>
                    </div>

                    <button onClick={handleShare} className={styles.shareBtn}>
                        <Share2 size={20} aria-hidden />
                        {t('NewsShare')}
                    </button>
                </article>

                {relatedNews.length > 0 && (
                    <div className={styles.relatedSection}>
                        <HomeSectionHeader title={t('NewsSimilar')} />
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
