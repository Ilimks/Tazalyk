// shared/ui/PageHeader/PageHeader.tsx
import React from 'react';
import styles from './NewsHeader.module.scss';

interface NewsHeaderProps {
    title: string;
    description?: string;
}

export const NewsHeader: React.FC<NewsHeaderProps> = ({ title, description }) => {
    return (
        <div className={styles.pageHeader}>
            <div className={styles.pageTitleWrapper}>
                <h1 className={styles.pageTitle}>{title}</h1>
            </div>
            {description && <p className={styles.pageDescription}>{description}</p>}
        </div>
    );
};