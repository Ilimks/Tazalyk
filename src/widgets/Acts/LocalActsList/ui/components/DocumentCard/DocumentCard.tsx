import React, { useState } from 'react';
import styles from './DocumentCard.module.scss';

interface DocumentCardProps {
    id: string;
    title: string;
    description?: string;
    date: string;
    onView: () => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
    title,
    description,
    date,
    onView
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <article
            className={`${styles.card} ${isHovered ? styles.cardHovered : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onView}
        >
            <div className={styles.cardIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
                </svg>
            </div>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{title}</h3>
                {description && <p className={styles.cardDescription}>{description}</p>}
                <time className={styles.cardDate}>{date}</time>
            </div>
            <div className={styles.cardActions}>
                <button className={styles.viewBtn} onClick={(e) => { e.stopPropagation(); onView(); }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Просмотр
                </button>
            </div>
        </article>
    );
};