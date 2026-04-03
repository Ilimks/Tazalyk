// shared/ui/Badge/Badge.tsx
import React from 'react';
import styles from './Badge.module.scss';

interface BadgeProps {
    label: string;
    color: string;
    backgroundColor: string;
    showDot?: boolean;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
    label, 
    color, 
    backgroundColor, 
    showDot = false,
    className = ''
}) => {
    return (
        <span 
            className={`${styles.badge} ${showDot ? styles.withDot : ''} ${className}`}
            style={{
                backgroundColor,
                color,
                borderColor: `${color}20`
            }}
        >
            {showDot && <span className={styles.statusDot}></span>}
            {label}
        </span>
    );
};