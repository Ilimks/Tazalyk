'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Calendar, Check, Share2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { formatDate } from '@/shared/lib/utils/formatDate';
import { getNewsTitle, getNewsDescription, getNewsDate, type News } from '@/entities/news';
import styles from './NewsDetail.module.scss';

const PLACEHOLDER_IMAGE = '/assets/images/placeholder-news.svg';
const TALL_RATIO = 1.25;
const LEAD_MAX = 340;
const COPIED_MS = 2500;

interface NewsDetailProps {
    news: News;
    relatedNews: News[];
}

export const NewsDetail: React.FC<NewsDetailProps> = ({ news, relatedNews }) => {
    const locale = useLocale();
    const t = useTranslations('NewsID');
    const tMain = useTranslations('Main');
    const [hasImage, setHasImage] = useState(Boolean(news.image));
    const imageUrl = news.image || PLACEHOLDER_IMAGE;
    const [isTall, setIsTall] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const title = getNewsTitle(news, locale);
    const description = getNewsDescription(news, locale);
    const dateLocale = locale === 'ky' ? 'ky-KG' : 'ru-RU';
    const dateOf = (item: News) => formatDate(getNewsDate(item), { format: 'long', locale: dateLocale });

    const paragraphs = useMemo(
        () => (description || '').split(/\n+/).map((text) => text.trim()).filter(Boolean),
        [description]
    );
    const hasLead = paragraphs.length > 1 && paragraphs[0].length <= LEAD_MAX;

    useEffect(() => () => {
        if (copiedTimer.current) clearTimeout(copiedTimer.current);
    }, []);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, text: description, url: window.location.href });
            } catch {
            }
            return;
        }

        try {
            await navigator.clipboard.writeText(window.location.href);
            setIsCopied(true);
            if (copiedTimer.current) clearTimeout(copiedTimer.current);
            copiedTimer.current = setTimeout(() => setIsCopied(false), COPIED_MS);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const shareButton = (
        <button type="button" onClick={handleShare} className={styles.shareBtn}>
            {isCopied ? <Check size={20} aria-hidden /> : <Share2 size={20} aria-hidden />}
            <span aria-live="polite">{isCopied ? t('NewsLinkCopied') : t('NewsShare')}</span>
        </button>
    );

    return (
        <div className={styles.newsDetail}>
            <div className="container">
                <header className={styles.header}>
                    <div className={styles.meta}>
                        <span className={styles.badge}>{t('NewsBadge')}</span>
                        <time className={styles.date} dateTime={getNewsDate(news)}>
                            <Calendar size={16} aria-hidden />
                            {dateOf(news)}
                        </time>
                        <div className={styles.shareTop}>{shareButton}</div>
                    </div>
                    <h1 className={styles.title}>{title}</h1>
                </header>

                <div className={`${styles.layout} ${relatedNews.length === 0 ? styles.single : ''}`}>
                    <article className={styles.article}>
                        {hasImage && (
                            <div className={`${styles.imageContainer} ${isTall ? styles.tall : ''}`}>
                                {isTall && (
                                    <Image src={imageUrl} alt="" fill sizes="200px" className={styles.backdrop} aria-hidden />
                                )}
                                <Image
                                    src={imageUrl}
                                    alt={title}
                                    fill
                                    className={styles.mainImage}
                                    priority
                                    sizes="(max-width: 1000px) 100vw, 840px"
                                    onLoad={({ currentTarget: { naturalWidth, naturalHeight } }) =>
                                        setIsTall(naturalHeight > 0 && naturalWidth / naturalHeight < TALL_RATIO)
                                    }
                                    onError={() => setHasImage(false)}
                                />
                            </div>
                        )}

                        <div className={styles.description}>
                            {paragraphs.map((text, index) => (
                                <p key={index} className={hasLead && index === 0 ? styles.lead : undefined}>{text}</p>
                            ))}
                        </div>

                        <div className={styles.shareBottom}>{shareButton}</div>
                    </article>

                    {relatedNews.length > 0 && (
                        <aside className={styles.aside} aria-labelledby="other-news">
                            <h2 id="other-news" className={styles.asideTitle}>{t('NewsSimilar')}</h2>
                            <ul className={styles.list}>
                                {relatedNews.map((item) => (
                                    <li key={item.id}>
                                        <Link href={`/news/${item.id}`} className={styles.item}>
                                            <span className={styles.thumb}>
                                                <Image src={item.image || PLACEHOLDER_IMAGE} alt="" fill sizes="(max-width: 1000px) 140px, 112px" />
                                            </span>
                                            <span className={styles.itemText}>
                                                <span className={styles.itemDate}>{dateOf(item)}</span>
                                                <span className={styles.itemTitle}>{getNewsTitle(item, locale)}</span>
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/news" className={styles.all}>
                                {tMain('MainNewsButton')}
                                <ArrowRight size={18} aria-hidden />
                            </Link>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
};
