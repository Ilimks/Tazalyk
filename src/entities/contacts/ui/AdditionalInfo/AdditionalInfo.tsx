'use client'
import styles from './AdditionalInfo.module.scss';

interface AdditionalInfoProps {
    title: string;
    text: string;
}

export const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ title, text }) => (
    <div className={styles.infoBlock}>
        <div className={styles.infoBlockIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
        <div className={styles.infoBlockContent}>
            <h3 className={styles.infoBlockTitle}>{title}</h3>
            <p className={styles.infoBlockText}>{text}</p>
        </div>
    </div>
);