'use client';
import React from 'react';
import { SectionHeader } from '@/shared/ui/SectionHeader/SectionHeader';
import { useDocuments } from '../../../../model/useDocuments';
import { useDocumentDownload } from '@/features/procurement/download';
import { useDocumentView } from '@/features/procurement/view';
import { DocumentsGrid } from './components/DocumentsGrid/DocumentsGrid';
import { DocumentModal } from './components/DocumentModal/DocumentModal';
import styles from './ProcurementFilesSection.module.scss';
import mobileStyles from './ProcurementFilesSectionMobile.module.scss';

export const ProcurementFilesSection: React.FC = () => {
    const { documents } = useDocuments();
    const { handleDownload } = useDocumentDownload();
    const { showModal, selectedDocument, handleView, closeModal } = useDocumentView();

    return (
        <>
            <section className={`${styles.documentsSection} ${mobileStyles.documentsSection}`}>
                <div className="container">
                    <div className={styles.documentsContainer}>
                        <SectionHeader 
                            title="Нормативно-правовые документы"
                            subtitle="Основные документы, регулирующие порядок проведения закупок"
                            centered={true}
                        />
                        
                        <DocumentsGrid 
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