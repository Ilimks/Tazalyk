import React from 'react';
import styles from './MediaHeader.module.scss';

interface MediaHeaderProps {
    title: string;
    description?: string;
}

export const MediaHeader: React.FC<MediaHeaderProps> = ({ title, description }) => {
    return (
        <div className={styles.pageHeader}>
            <div className={styles.pageTitleWrapper}>
                <h1 className={styles.pageTitle}>{title}</h1>
            </div>
            {description && <p className={styles.pageDescription}>{description}</p>}
        </div>
    );
};