// widgets/documents/ProcurementFiles/ui/components/DocumentsGrid/DocumentsGrid.tsx
import React from 'react';
import { DocumentCard } from '@/shared/ui/DocumentCard';
import { DocumentCard as DocumentCardType } from '@/entities/procurement/model/types';
import styles from './DocumentsGrid.module.scss';

interface DocumentsGridProps {
    documents: DocumentCardType[];
    onView: (doc: DocumentCardType) => void;
    onDownload: (pdfUrl: string, fileName: string) => void;
}

export const DocumentsGrid: React.FC<DocumentsGridProps> = ({
    documents,
    onView,
    onDownload
}) => {
    return (
        <div className={styles.documentsGrid}>
            {documents.map((doc) => (
                <DocumentCard
                    key={doc.id}
                    title={doc.title}
                    description={doc.description}
                    iconType={doc.icon}
                    onView={() => onView(doc)}
                    onDownload={() => onDownload(doc.pdfUrl, doc.fileName)}
                />
            ))}
        </div>
    );
};