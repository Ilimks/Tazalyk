// shared/ui/InfoCard/InfoCard.tsx
import React from 'react';
import styles from './InfoCard.module.scss';

interface InfoCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, description, icon }) => {
    return (
        <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
                {icon || (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <rect x="8" y="4" width="8" height="16" stroke="currentColor" strokeWidth="2" rx="1"/>
                    </svg>
                )}
            </div>
            <div className={styles.infoContent}>
                <h4 className={styles.infoTitle}>{title}</h4>
                <p className={styles.infoText}>{description}</p>
            </div>
        </div>
    );
};