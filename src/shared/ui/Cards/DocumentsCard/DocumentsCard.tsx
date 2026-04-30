'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Document } from '@/entities/document/model/types';
import styles from './DocumentsCard.module.scss';

interface DocumentsCardProps {
    document: Document;
    onView: (doc: Document) => void;
    onDownload: (doc: Document) => void;
}

export const DocumentsCard: React.FC<DocumentsCardProps> = ({
    document,
    onView,
    onDownload,
}) => {
    const t = useTranslations("Documents");

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 KB';
        const k = 1024;
        const sizes = ['KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2"/>
                </svg>
            </div>
            
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{document.title}</h3>
                
                <div className={styles.cardMeta}>
                    <span className={styles.cardDate}>
                        📅 {formatDate(document.date)}
                    </span>
                    <span className={styles.cardSize}>
                        💾 {formatFileSize(document.file_size)}
                    </span>
                </div>
                
                <div className={styles.cardActions}>
                    <button
                        className={styles.viewBtn}
                        onClick={() => onView(document)}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        {t('view')}
                    </button>
                    <button
                        className={styles.downloadBtn}
                        onClick={() => onDownload(document)}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2"/>
                            <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2"/>
                            <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        {t('download')}
                    </button>
                </div>
            </div>
        </div>
    );
};