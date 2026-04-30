'use client';
import React, { useEffect } from 'react';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useTranslations } from 'next-intl';
import { useDocuments } from './model/useDocuments';
import { DocumentsGrid } from './ui/DocumentsGrid';
import { legislationApi } from '@/shared/api/endpoints/legislation';
import styles from './DocumentsPage.module.scss';

export const LegislationPage: React.FC = () => {
    const t = useTranslations("Documents");
    const { items: documents, loading, error, fetchLegislation } = useDocuments();

    useEffect(() => {
        fetchLegislation();
    }, [fetchLegislation]);

    const handleView = (doc: any) => {
        legislationApi.view(doc.file_url);
    };

    const handleDownload = (doc: any) => {
        legislationApi.download(doc.file_url, doc.file_name);
    };

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <div className="container">
                    <div className={styles.error}>
                        <h2>{t('errorTitle')}</h2>
                        <p>{error}</p>
                        <button onClick={() => fetchLegislation()}>{t('retry')}</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <PageHeader
                title={t('legislationTitle')}
                description={t('legislationDescription')}
            />
            <div className={styles.documentsPage}>
                <div className="container">
                    <DocumentsGrid
                        documents={documents}
                        loading={loading}
                        onView={handleView}
                        onDownload={handleDownload}
                        itemsPerPage={9}
                    />
                </div>
            </div>
        </>
    );
};