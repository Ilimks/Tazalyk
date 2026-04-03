'use client';
import React from 'react';
import styles from './ActsHeader.module.scss';

interface ActsHeaderProps {
    title: string;
    description?: string;
}

export const ActsHeader: React.FC<ActsHeaderProps> = ({ title, description }) => {
    return (
        <div className={styles.pageHeader}>
            <div className={styles.pageTitleWrapper}>
                <h1 className={styles.pageTitle}>{title}</h1>
            </div>
            {description && <p className={styles.pageDescription}>{description}</p>}
        </div>
    );
};