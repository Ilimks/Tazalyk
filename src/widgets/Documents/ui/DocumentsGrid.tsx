'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Document } from '@/entities/document/model/types';
import { DocumentsCard } from '@/shared/ui/Cards/DocumentsCard';
import { Pagination } from '@/shared/ui/Pagination';
import styles from './DocumentsGrid.module.scss';

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

    // Пагинация
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
                <div className={styles.spinner}></div>
                <p>{t('loading')}</p>
            </div>
        );
    }

    if (!documents || documents.length === 0) {
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