'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { fetchNewsById } from '@/entities/news/api/newsApi';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
    const locale = useLocale();
    const pathname = usePathname();
    const t = useTranslations('Breadcrumbs');
    const [newsTitle, setNewsTitle] = useState<string | null>(null);
    
    // Убираем локаль из пути
    let cleanPath = pathname;
    if (pathname.startsWith(`/${locale}`)) {
        cleanPath = pathname.substring(locale.length + 1) || '/';
    }
    
    const segments = cleanPath.split('/').filter(Boolean);
    
    // Проверяем, страница ли это новости
    const isNewsPage = segments[0] === 'news' && segments[1] && /^\d+$/.test(segments[1]);
    const newsId = isNewsPage ? segments[1] : null;
    
    // Загружаем название новости
    useEffect(() => {
        if (newsId) {
            fetchNewsById(newsId).then(news => {
                if (news) {
                    // Выбираем заголовок в зависимости от текущей локали
                    let title = '';
                    if (locale === 'ky' && news.title_ky) {
                        title = news.title_ky;
                    } else {
                        title = news.title_ru; // По умолчанию используем русский
                    }
                    
                    const shortTitle = title.length > 25 
                        ? title.substring(0, 22) + '...' 
                        : title;
                    setNewsTitle(shortTitle);
                }
            }).catch(() => setNewsTitle(null));
        }
    }, [newsId, locale]);
    
    if (segments.length === 0) return null;
    
    const getLabel = (segment: string, index: number) => {

        if (isNewsPage && index === segments.length - 1 && newsId) {
            return newsTitle || t('loading');
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
            'about': t('about'),
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