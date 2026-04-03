'use client'
import styles from './ContactsHeader.module.scss';

interface ContactsHeaderProps {
    title: string;
    description: string;
}

export const ContactsHeader: React.FC<ContactsHeaderProps> = ({ title, description }) => (
    <div className={styles.pageHeader}>
        <div className={styles.pageTitleWrapper}>
            <h1 className={styles.pageTitle}>{title}</h1>
        </div>
        <p className={styles.pageDescription}>{description}</p>
    </div>
);