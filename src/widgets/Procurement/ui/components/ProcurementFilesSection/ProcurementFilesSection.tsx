'use client';
import { ProcurementFilesHeader } from './components/ProcurementFilesHeader';
import { useDocumentDownload } from '@/features/procurement/download';
import { useDocumentView } from '@/features/procurement/view';
import { ProcurementDocumentsGrid } from './components/ProcurementDocumentsGrid';
import { DocumentModal } from '@/shared/ui/Modals';
import styles from './ProcurementFilesSection.module.scss';
import mobileStyles from './ProcurementFilesSectionMobile.module.scss';
import { useTranslations } from 'next-intl';
import { getDocumentsConfig } from '@/shared/config/documents';

export const ProcurementFilesSection: React.FC = () => {
    const t = useTranslations("Procurement");
    const documents = getDocumentsConfig(t);
    const { handleDownload } = useDocumentDownload();
    const { showModal, selectedDocument, handleView, closeModal } = useDocumentView();

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

            <DocumentModal 
                isOpen={showModal}
                document={selectedDocument}
                onClose={closeModal}
                onDownload={handleDownload}
            />
        </>
    );
};