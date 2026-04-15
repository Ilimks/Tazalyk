'use client'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { useBreadcrumbs } from '@/features/breadcrumbs';
import { usePathname } from 'next/navigation';
import styles from './BreadcrumbsWidget.module.scss';

interface BreadcrumbsWidgetProps {
    customItems?: Array<{ label: string; href: string }>;
    hideOnPaths?: string[];
}

export const BreadcrumbsWidget: React.FC<BreadcrumbsWidgetProps> = ({ 
    customItems, 
    hideOnPaths = ['/', '/admin'] 
}) => {
    const { breadcrumbs } = useBreadcrumbs();
    const pathname = usePathname();
    
    // Скрываем на определенных страницах
    if (hideOnPaths.includes(pathname)) return null;
    
    // ВАЖНО: customItems имеют приоритет
    const items = customItems && customItems.length > 0 ? customItems : breadcrumbs;
    
    if (items.length === 0) return null;
    
    return (
        <div className={styles.widget}>
            <div className="container">
                <Breadcrumbs />
            </div>
        </div>
    );
};