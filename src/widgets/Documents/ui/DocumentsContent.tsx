'use client';
import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useDocuments } from '../model/useDocuments';
import { DocumentsGrid } from './DocumentsGrid';
import { EmptyState } from '@/shared/ui/EmptyState';
import { ErrorState } from '@/shared/ui/ErrorState';
import { downloadFile, viewFile } from '@/shared/lib/utils/file';
import type { Document } from '@/entities/document';
import type { DocumentsKind } from '../model/types';

interface DocumentsContentProps {
    kind: DocumentsKind;
    // документы, загруженные на сервере; null — сервер не смог их загрузить, грузим в браузере
    initialDocuments?: Document[] | null;
}

export const DocumentsContent: React.FC<DocumentsContentProps> = ({ kind, initialDocuments = null }) => {
    const t = useTranslations('Documents');
    const {
        items: loadedDocuments, loading: isLoading, error: loadError, fetchLegislation, fetchLocalActs
    } = useDocuments();
    const fetchDocuments = kind === 'legislation' ? fetchLegislation : fetchLocalActs;
    const loadOnClient = initialDocuments === null;

    useEffect(() => {
        if (loadOnClient) fetchDocuments();
    }, [loadOnClient, fetchDocuments]);

    // список документов не листается через API, поэтому данные с сервера заменяют загрузку целиком
    const documents = initialDocuments ?? loadedDocuments;
    const loading = loadOnClient && isLoading;
    const error = loadOnClient ? loadError : null;

    const handleView = (doc: Document) => viewFile(doc.file_url, doc.file_name, t('viewUnavailable'));
    const handleDownload = (doc: Document) => downloadFile(doc.file_url, doc.file_name, t('downloadUnavailable'));

    if (error) {
        return (
            <ErrorState
                error={error}
                onRetry={fetchDocuments}
                title={t('errorTitle')}
                variant="compact"
            />
        );
    }

    if (!loading && documents.length === 0) {
        return <EmptyState variant={kind} />;
    }

    return (
        <DocumentsGrid
            documents={documents}
            loading={loading}
            onView={handleView}
            onDownload={handleDownload}
            itemsPerPage={9}
        />
    );
};
