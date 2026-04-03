'use client'
import styles from './HistoryHeader.module.scss';

interface HistoryHeaderProps {
    title: string;
    description: string;
}

export const HistoryHeader: React.FC<HistoryHeaderProps> = ({ title, description }) => (
    <div className={styles.pageHeader}>
        <div className={styles.pageTitleWrapper}>
            <h1 className={styles.pageTitle}>{title}</h1>
        </div>
        <p className={styles.pageDescription}>{description}</p>
    </div>
);