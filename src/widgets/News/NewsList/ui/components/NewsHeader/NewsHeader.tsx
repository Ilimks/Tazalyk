import React from 'react';
import styles from './NewsHeader.module.scss';

export const NewsHeader: React.FC = () => {
    return (
        <div className={styles.pageHeader}>
            <div className={styles.pageTitleWrapper}>
                <h1 className={styles.pageTitle}>Новости</h1>
            </div>
            <p className={styles.pageDescription}>
                Актуальные новости и события муниципального предприятия "Тазалык"
            </p>
        </div>
    );
};