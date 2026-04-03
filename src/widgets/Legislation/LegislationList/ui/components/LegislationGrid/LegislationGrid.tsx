import React from 'react';
import { LegislationDocument } from '@/entities/legislation/model/types';
import { LegislationCard } from '../LegislationCard/LegislationCard';
import styles from './LegislationGrid.module.scss';

interface LegislationGridProps {
    documents: LegislationDocument[];
    onView: (doc: LegislationDocument) => void;
    onDownload: (url: string, fileName: string) => void;
}

export const LegislationGrid: React.FC<LegislationGridProps> = ({
    documents,
    onView,
    onDownload
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className={styles.documentGrid}>
            {documents.map((doc) => (
                <LegislationCard
                    key={doc.id}
                    id={doc.id}
                    title={doc.title}
                    description={doc.description}
                    date={formatDate(doc.date)}
                    onView={() => onView(doc)}
                    onDownload={() => onDownload(doc.pdfUrl, doc.fileName)}
                />
            ))}
        </div>
    );
};