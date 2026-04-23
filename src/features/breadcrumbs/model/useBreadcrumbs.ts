'use client'
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { BreadcrumbItem } from '@/shared/ui/Breadcrumbs';
import { useTranslations } from 'next-intl';

export const useBreadcrumbs = () => {
    const pathname = usePathname();
    const t = useTranslations('Breadcrumbs');
    
    const routeNames: Record<string, string> = {
        'news': t('news'),
        'media': t('media'),
        'procurement': t('procurement'),
        'services': t('services'),
        'contacts': t('contact'),
        'about': t('about'),
        'history': t('history'),
        'structure': t('structure'),
        'directorate': t('directorate'),
        'results': t('results'),
        'acts': t('acts'),
        'legislation': t('legislation'),
        'tariffs': t('tariffs'),
        'vacancies': t('vacancies'),
    };
    
    const formatLabel = (segment: string): string => {
        if (routeNames[segment]) return routeNames[segment];
        
        if (/^\d+$/.test(segment)) {
            return `${t('news')} ${segment.slice(-4)}`;
        }
        
        return segment
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    
    const breadcrumbs = useMemo((): BreadcrumbItem[] => {
        const segments = pathname.split('/').filter(Boolean);
        const locales = ['ru', 'en', 'ky'];
        const filteredSegments = segments.filter(seg => !locales.includes(seg));
        
        const items: BreadcrumbItem[] = [
            { label: t('home'), href: '/', isActive: false }
        ];
        
        let currentPath = '';
        
        for (const segment of filteredSegments) {
            currentPath += `/${segment}`;
            
            items.push({
                label: formatLabel(segment),
                href: currentPath,
                isActive: false
            });
        }
        
        if (items.length > 0) {
            items[items.length - 1].isActive = true;
        }
        
        return items;
    }, [pathname]);
    
    return { breadcrumbs, pathname };
};