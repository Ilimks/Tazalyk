'use client'
import styles from './ServiceZoneHeader.module.scss';

interface ServiceZoneHeaderProps {
    title: string;
    description: string;
}

export const ServiceZoneHeader: React.FC<ServiceZoneHeaderProps> = ({ title, description }) => (
    <div className={styles.pageHeader}>
        <div className={styles.pageTitleWrapper}>
            <h1 className={styles.pageTitle}>{title}</h1>
        </div>
        <p className={styles.pageDescription}>{description}</p>
    </div>
);