import React from 'react';
import { LocalAct } from '@/entities/acts/model/types';
import { DocumentCard } from '../DocumentCard/DocumentCard';
import styles from './DocumentGrid.module.scss';

interface DocumentGridProps {
    documents: LocalAct[];
    onView: (doc: LocalAct) => void;
}

export const DocumentGrid: React.FC<DocumentGridProps> = ({ documents, onView }) => {
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
                <DocumentCard
                    key={doc.id}
                    id={doc.id}
                    title={doc.title}
                    description={doc.description}
                    date={formatDate(doc.date)}
                    onView={() => onView(doc)}
                />
            ))}
        </div>
    );
};