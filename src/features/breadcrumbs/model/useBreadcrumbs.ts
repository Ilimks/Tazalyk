'use client'
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { BreadcrumbItem } from '@/shared/ui/Breadcrumbs';

const routeNames: Record<string, string> = {
    'news': 'Новости',
    'media': 'Медиа',
    'procurement': 'Закупки',
    'services': 'Услуги',
    'contacts': 'Контакты',
    'about': 'О компании',
    'history': 'История',
    'structure': 'Структура',
    'directorate': 'Руководство',
    'results': 'Результаты',
    'acts': 'Акты',
    'legislation': 'Законодательство',
    'tariffs': 'Тарифы',
    'vacancies': 'Вакансии',
};

const formatLabel = (segment: string): string => {
    if (routeNames[segment]) return routeNames[segment];
    
    if (isNaN(Number(segment))) {
        return segment
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    
    return `Новость ${segment.slice(-4)}`; // ← показываем последние 4 цифры ID
};

export const useBreadcrumbs = () => {
    const pathname = usePathname();
    
    const breadcrumbs = useMemo((): BreadcrumbItem[] => {
        const segments = pathname.split('/').filter(Boolean);
        const items: BreadcrumbItem[] = [];
        let currentPath = '';
        
        for (const segment of segments) {
            currentPath += `/${segment}`;
            
            const isDynamicId = /^\d+$/.test(segment);
            
            items.push({
                label: isDynamicId ? formatLabel(segment) : formatLabel(segment),
                href: currentPath,
                isActive: false
            });
        }
        
        // Последний элемент делаем активным
        if (items.length > 0) {
            items[items.length - 1].isActive = true;
        }
        
        return items;
    }, [pathname]);
    
    return { breadcrumbs, pathname };
};