'use client';
import { useLocale, useTranslations } from 'next-intl';
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
    const locale = useLocale();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(locale === 'ky' ? 'ky-KG' : 'ru-RU', {
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