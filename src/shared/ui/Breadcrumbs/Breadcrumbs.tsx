'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { fetchNewsById } from '@/entities/news/api/newsApi';
import styles from './Breadcrumbs.module.scss';

export type BreadcrumbItem = {
    label: string;
    href: string;
    isActive: boolean;
};

export const Breadcrumbs = () => {
    const locale = useLocale();
    const pathname = usePathname();
    const t = useTranslations('Breadcrumbs');
    const [newsTitle, setNewsTitle] = useState<string | null>(null);
    
    let cleanPath = pathname;
    if (pathname.startsWith(`/${locale}`)) {
        cleanPath = pathname.substring(locale.length + 1) || '/';
    }
    
    const segments = cleanPath.split('/').filter(Boolean);
    const isNewsPage = segments[0] === 'news' && segments[1] && segments[1].length > 0;
    const newsId = isNewsPage ? segments[1] : null;
    
    useEffect(() => {
        if (newsId) {
            fetchNewsById(newsId, locale).then(news => {
                if (news) {
                    let title = '';
                    if (locale === 'ky' && news.title_ky) {
                        title = news.title_ky;
                    } else if (news.title_ru) {
                        title = news.title_ru;
                    } else {
                        title = t('news');
                    }
                    const shortTitle = title.length > 25 
                        ? title.substring(0, 22) + '...' 
                        : title;
                    setNewsTitle(shortTitle);
                } else {
                    setNewsTitle(t('news'));
                }
            }).catch(() => {
                setNewsTitle(t('news'));
            });
        }
    }, [newsId, locale, t]);
    
    if (segments.length === 0) return null;
    
    const getLabel = (segment: string, index: number) => {
        if (isNewsPage && index === segments.length - 1 && newsId) {
            return newsTitle || '...';
        }

        const names: Record<string, string> = {
            'tariffs': t('tariffs'),
            'media': t('media'),
            'news': t('news'),
            'contacts': t('contact'),
            'services': t('services'),
            'acts': t('acts'),
            'directorate': t('directorate'),
            'history': t('history'),
            'legislation': t('legislation'),
            'procurement': t('procurement'),
            'results': t('results'),
            'structure': t('structure'),
            'vacancies': t('vacancies'),
            'complaints': t('complaints'),
            'about': t('about'),
            'attendance': t('attendance'),
        };

        return names[segment] || segment
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    
    return (
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <ol className={styles.breadcrumbs__list}>
                <li className={styles.breadcrumbs__item}>
                    <Link href={`/${locale}`} className={styles.breadcrumbs__link}>
                        {t('home')}
                    </Link>
                </li>
                {segments.map((segment, i) => {
                    const path = `/${segments.slice(0, i + 1).join('/')}`;
                    const isLast = i === segments.length - 1;
                    const localizedHref = `/${locale}${path}`;
                    
                    return (
                        <li key={i} className={styles.breadcrumbs__item}>
                            <span className={styles.breadcrumbs__separator}>
                                /
                            </span>
                            {isLast ? (
                                <span className={styles.breadcrumbs__current}>
                                    {getLabel(segment, i)}
                                </span>
                            ) : (
                                <Link href={localizedHref} className={styles.breadcrumbs__link}>
                                    {getLabel(segment, i)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};