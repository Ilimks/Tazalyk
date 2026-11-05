'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { DocumentsCard, type Document } from '@/entities/document';
import { Pagination } from '@/shared/ui/Pagination';
import { FileText } from 'lucide-react';
import styles from './DocumentsGrid.module.scss';
import { Loading } from '@/shared/ui/Loading';

interface DocumentsGridProps {
    documents: Document[];
    loading: boolean;
    onView: (doc: Document) => void;
    onDownload: (doc: Document) => void;
    itemsPerPage?: number;
}

export const DocumentsGrid: React.FC<DocumentsGridProps> = ({
    documents,
    loading,
    onView,
    onDownload,
    itemsPerPage = 9,
}) => {
    const t = useTranslations("Documents");
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(documents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentDocuments = documents.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className={styles.loader}>
                <Loading/>
                <p>{t('loading')}</p>
            </div>
        );
    }

    if (!documents || documents.length === 0) {
        return (
            <div className={styles.empty}>
                <FileText size={64} strokeWidth={1.5} aria-hidden />
                <p>{t('noDocuments')}</p>
            </div>
        );
    }

    return (
        <div className={styles.documentsGrid}>
            <div className={styles.grid}>
                {currentDocuments.map((doc) => (
                    <DocumentsCard
                        key={doc.id}
                        document={doc}
                        onView={onView}
                        onDownload={onDownload}
                    />
                ))}
            </div>
            
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    totalItems={documents.length}
                    currentItemsCount={currentDocuments.length}
                />
            )}
        </div>
    );
};