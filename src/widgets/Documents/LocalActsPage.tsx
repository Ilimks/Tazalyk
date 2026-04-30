'use client';
import React, { useEffect } from 'react';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useTranslations } from 'next-intl';
import { useDocuments } from './model/useDocuments';
import { DocumentsGrid } from './ui/DocumentsGrid';
import { localActsApi } from '@/shared/api/endpoints/localActs';
import styles from './DocumentsPage.module.scss';

export const LocalActsPage: React.FC = () => {
    const t = useTranslations("Documents");
    const { items: documents, loading, error, fetchLocalActs } = useDocuments();

    useEffect(() => {
        fetchLocalActs();
    }, [fetchLocalActs]);

    const handleView = (doc: any) => {
        localActsApi.view(doc.file_url);
    };

    const handleDownload = (doc: any) => {
        localActsApi.download(doc.file_url, doc.file_name);
    };

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <div className="container">
                    <div className={styles.error}>
                        <h2>{t('errorTitle')}</h2>
                        <p>{error}</p>
                        <button onClick={() => fetchLocalActs()}>{t('retry')}</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <PageHeader
                title={t('localActsTitle')}
                description={t('localActsDescription')}
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