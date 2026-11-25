'use client';
import { useTranslations } from 'next-intl';
import { Calendar, Download, Eye, FileText, HardDrive } from 'lucide-react';
import { Document } from '../../model/types';
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

    // формат один на оба языка: в Chrome нет кыргызского, и дата с сервера не совпадала с браузером
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    // «449.82 KB» → «450 КБ», «1,2 МБ»
    const formatFileSize = (bytes: number) => {
        const number = (value: number, digits: number) =>
            value.toLocaleString('ru-RU', { maximumFractionDigits: digits });
        if (bytes < 1024 * 1024) return `${number(bytes / 1024, 0)} КБ`;
        return `${number(bytes / 1024 / 1024, 1)} МБ`;
    };

    return (
        <div data-reveal suppressHydrationWarning className={styles.card}>
            <div className={styles.cardIcon}>
                <FileText size={32} aria-hidden />
            </div>
            
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{document.title}</h3>
                
                <div className={styles.cardMeta}>
                    <span className={styles.cardDate}>
                        <Calendar size={14} aria-hidden />
                        {formatDate(document.date)}
                    </span>
                    <span className={styles.cardSize}>
                        <HardDrive size={14} aria-hidden />
                        {formatFileSize(document.file_size)}
                    </span>
                </div>
                
                <div className={styles.cardActions}>
                    <button
                        className={styles.viewBtn}
                        onClick={() => onView(document)}
                    >
                        <Eye size={18} aria-hidden />
                        {t('view')}
                    </button>
                    <button
                        className={styles.downloadBtn}
                        onClick={() => onDownload(document)}
                    >
                        <Download size={18} aria-hidden />
                        {t('download')}
                    </button>
                </div>
            </div>
        </div>
    );
};