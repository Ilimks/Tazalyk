'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { fetchNewsById } from '@/entities/news/api/newsApi';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
    const locale = useLocale();
    const pathname = usePathname();
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
                if (news?.title) {
                    const shortTitle = news.title.length > 25 
                        ? news.title.substring(0, 22) + '...' 
                        : news.title;
                    setNewsTitle(shortTitle);
                }
            }).catch(() => setNewsTitle(null));
        }
    }, [newsId]);
    
    if (segments.length === 0) return null;
    
    const getLabel = (segment: string, index: number) => {
        // Если это ID новости
        if (isNewsPage && index === segments.length - 1 && newsId) {
            return newsTitle || 'Загрузка...';
        }
        
        const names: Record<string, string> = {
            'tariffs': 'Тарифы',
            'media': 'Медиа',
            'news': 'Новости',
            'contacts': 'Контакты',
            'services': 'Услуги',
            'acts': 'Акты',
            'directorate': 'Дирекция',
            'history': 'История',
            'legislation': 'Законодательство',
            'material': 'Материалы',
            'procurement': 'Закупки',
            'providers': 'Поставщики',
            'results': 'Результаты',
            'structure': 'Структура',
            'vacancies': 'Вакансии',
        };
        return names[segment] || segment;
    };
    
    return (
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <ol className={styles.breadcrumbs__list}>
                <li className={styles.breadcrumbs__item}>
                    <Link href={`/${locale}`} className={styles.breadcrumbs__link}>
                        Главная
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