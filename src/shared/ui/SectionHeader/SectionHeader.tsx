// shared/ui/SectionHeader/SectionHeader.tsx
import React from 'react';
import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
    title, 
    subtitle, 
    centered = true 
}) => {
    return (
        <div className={`${styles.sectionHeader} ${centered ? styles.centered : ''}`}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
    );
};