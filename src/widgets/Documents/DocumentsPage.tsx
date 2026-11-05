import { getTranslations } from 'next-intl/server';
import { PageHeader } from '@/shared/ui/PageHeader';
import { getServerFetchOptions } from '@/shared/api';
import { legislationApi, localActsApi, type Document } from '@/entities/document';
import { DocumentsContent } from './ui/DocumentsContent';
import type { DocumentsKind } from './model/types';
import styles from './DocumentsPage.module.scss';

interface DocumentsPageProps {
    kind: DocumentsKind;
}

const documentsApis = {
    legislation: legislationApi,
    localActs: localActsApi,
};

const getInitialDocuments = async (kind: DocumentsKind): Promise<Document[] | null> => {
    try {
        return await documentsApis[kind].getAll(getServerFetchOptions());
    } catch (error) {
        // если API недоступен, список загрузится в браузере и покажет ошибку с кнопкой повтора
        console.error(`Failed to prefetch ${kind}:`, error);
        return null;
    }
};

// Список документов загружается на сервере — он сразу есть в HTML для поисковиков
export const DocumentsPage = async ({ kind }: DocumentsPageProps) => {
    const [t, initialDocuments] = await Promise.all([
        getTranslations('Documents'),
        getInitialDocuments(kind),
    ]);

    return (
        <>
            <PageHeader
                title={t(`${kind}Title`)}
                description={t(`${kind}Description`)}
            />
            <div className={styles.documentsPage}>
                <div className="container">
                    <DocumentsContent kind={kind} initialDocuments={initialDocuments} />
                </div>
            </div>
        </>
    );
};
