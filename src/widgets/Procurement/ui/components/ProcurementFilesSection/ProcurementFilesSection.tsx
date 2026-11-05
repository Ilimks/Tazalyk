'use client';
import { ProcurementFilesHeader } from './components/ProcurementFilesHeader';
import { useDocumentDownload } from '@/features/procurement/download';
import { ProcurementDocumentsGrid } from './components/ProcurementDocumentsGrid';
import styles from './ProcurementFilesSection.module.scss';
import mobileStyles from './ProcurementFilesSectionMobile.module.scss';
import { useTranslations } from 'next-intl';
import { getDocumentsConfig } from '../../../model/documentsConfig';
import { openInNewTab } from '@/shared/lib/utils/file';
import type { DocumentCard } from '@/entities/procurement/model/types';

export const ProcurementFilesSection: React.FC = () => {
    const t = useTranslations("Procurement");
    const documents = getDocumentsConfig(t);
    const { handleDownload } = useDocumentDownload();

    const handleView = (document: DocumentCard) => {
        openInNewTab(document.pdfUrl);
    };

    return (
        <>
            <section className={`${styles.documentsSection} ${mobileStyles.documentsSection}`}>
                <div className="container">
                    <div className={styles.documentsContainer}>
                        <ProcurementFilesHeader 
                            title={t('ProcurementFilesTitle')}
                            subtitle={t('ProcurementFilesDescription')}
                            centered={true}
                        />
                        
                        <ProcurementDocumentsGrid 
                            documents={documents}
                            onView={handleView}
                            onDownload={handleDownload}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};