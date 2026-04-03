'use client'
import styles from './TariffsHeader.module.scss';

interface TariffsHeaderProps {
    title: string;
    description: string;
    documentInfo: string;
}

export const TariffsHeader: React.FC<TariffsHeaderProps> = ({ title, description, documentInfo }) => (
    <div className={styles.pageHeader}>
        <div className={styles.pageTitleWrapper}>
            <h1 className={styles.pageTitle}>{title}</h1>
        </div>
        <p className={styles.pageDescription}>{description}</p>
        <div className={styles.documentInfo}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2"/>
                <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>{documentInfo}</span>
        </div>
    </div>
);