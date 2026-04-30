'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Document } from '@/entities/document/model/types';
import styles from './DocumentsList.module.scss';

interface DocumentsListProps {
    documents: Document[];
    loading: boolean;
    onView: (doc: Document) => void;
    onDownload: (doc: Document) => void;
}

export const DocumentsList: React.FC<DocumentsListProps> = ({
    documents,
    loading,
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

    if (loading) {
        return (
            <div className={styles.loader}>
                <div className={styles.spinner}></div>
                <p>{t('loading')}</p>
            </div>
        );
    }

    // Проверяем, что documents существует и является массивом
    if (!documents || !Array.isArray(documents) || documents.length === 0) {
        return (
            <div className={styles.empty}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <p>{t('noDocuments')}</p>
            </div>
        );
    }

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.titleCol}>{t('title')}</th>
                        <th className={styles.dateCol}>{t('date')}</th>
                        <th className={styles.sizeCol}>{t('size')}</th>
                        <th className={styles.actionsCol}>{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((doc) => (
                        <tr key={doc.id}>
                            <td className={styles.titleCol}>
                                <span className={styles.fileIcon}>📄</span>
                                {doc.title}
                            </td>
                            <td className={styles.dateCol}>{formatDate(doc.date)}</td>
                            <td className={styles.sizeCol}>{formatFileSize(doc.file_size)}</td>
                            <td className={styles.actionsCol}>
                                <button
                                    className={styles.viewBtn}
                                    onClick={() => onView(doc)}
                                    title={t('view')}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                </button>
                                <button
                                    className={styles.downloadBtn}
                                    onClick={() => onDownload(doc)}
                                    title={t('download')}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2"/>
                                        <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2"/>
                                        <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};