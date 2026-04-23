// BreadcrumbsWidget.tsx
'use client'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { usePathname } from 'next/navigation';
import styles from './BreadcrumbsWidget.module.scss';

interface BreadcrumbsWidgetProps {
    hideOnPaths?: string[];
}

export const BreadcrumbsWidget: React.FC<BreadcrumbsWidgetProps> = ({ 
    hideOnPaths = ['/', '/admin'] 
}) => {
    const pathname = usePathname();
    
    if (hideOnPaths.includes(pathname)) return null;
    
    return (
        <div className={styles.widget}>
            <div className="container">
                <Breadcrumbs />
            </div>
        </div>
    );
};