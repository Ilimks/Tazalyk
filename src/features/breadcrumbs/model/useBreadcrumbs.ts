'use client'
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import type { BreadcrumbItem } from '@/shared/ui/Breadcrumbs';

// сегмент адреса → ключ в messages/*.json → Breadcrumbs
const ROUTE_KEYS: Record<string, string> = {
    news: 'news',
    media: 'media',
    procurement: 'procurement',
    services: 'services',
    contacts: 'contact',
    about: 'about',
    history: 'history',
    structure: 'structure',
    directorate: 'directorate',
    results: 'results',
    acts: 'acts',
    legislation: 'legislation',
    tariffs: 'tariffs',
    vacancies: 'vacancies',
    complaints: 'complaints',
    attendance: 'attendance',
    employee: 'employee',
    shop: 'shop',
    cart: 'cart',
    search: 'search',
};

const MAX_LABEL_LENGTH = 25;

const shorten = (label: string) =>
    label.length > MAX_LABEL_LENGTH ? `${label.slice(0, MAX_LABEL_LENGTH - 3)}...` : label;

const humanize = (segment: string) =>
    segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

// currentLabel — подпись последнего пункта, например заголовок новости
export const useBreadcrumbs = (currentLabel?: string): BreadcrumbItem[] => {
    // путь без префикса языка: "/news/12"
    const pathname = usePathname();
    const t = useTranslations('Breadcrumbs');

    return useMemo(() => {
        const segments = pathname.split('/').filter(Boolean);
        const items: BreadcrumbItem[] = [
            { label: t('home'), href: '/', isActive: segments.length === 0 },
        ];

        segments.forEach((segment, index) => {
            const isLast = index === segments.length - 1;
            const key = ROUTE_KEYS[segment];
            const label = isLast && currentLabel
                ? shorten(currentLabel)
                : key ? t(key) : humanize(segment);

            items.push({
                label,
                href: `/${segments.slice(0, index + 1).join('/')}`,
                isActive: isLast,
            });
        });

        return items;
    }, [pathname, t, currentLabel]);
};
