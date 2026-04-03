import React from 'react';
import styles from './EmptyStateMedia.module.scss';

interface EmptyStateMediaProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
}

export const EmptyStateMedia: React.FC<EmptyStateMediaProps> = ({ title, description, icon }) => {
    return (
        <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
                {icon || (
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                        <path d="M21 15l-5-4-3 3-4-4-5 5" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                )}
            </div>
            <h3 className={styles.emptyTitle}>{title}</h3>
            {description && <p className={styles.emptyText}>{description}</p>}
        </div>
    );
};