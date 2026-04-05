// widgets/documents/ProcurementFiles/ui/components/DocumentModal/DocumentModal.tsx
import React from 'react';
import { Modal } from '@/shared/ui/Modal';
import { ButtonTable } from '@/shared/ui/ButtonTable';
import { DocumentCard } from '@/entities/procurement/model/types';
import { isContentArray } from '@/entities/procurement/lib/helpers';
import { DocumentIcons } from '@/shared/ui/DocumentIcons';
import styles from './DocumentModal.module.scss';

interface DocumentModalProps {
    isOpen: boolean;
    document: DocumentCard | null;
    onClose: () => void;
    onDownload: (pdfUrl: string, fileName: string) => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
    isOpen,
    document,
    onClose,
    onDownload
}) => {
    if (!document || !document.modalContent) return null;

    const { title, sections, footer } = document.modalContent;

    const footerActions = (
        <>
            <ButtonTable
                variant="primary"
                icon={DocumentIcons.downloadIcon}
                onClick={() => onDownload(document.pdfUrl, document.fileName)}
            >
                Скачать PDF
            </ButtonTable>
            <ButtonTable
                variant="secondary"
                onClick={onClose}
            >
                Закрыть
            </ButtonTable>
        </>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            footer={footerActions}
            size="md"
        >
            <div className={styles.documentContent}>
                {sections.map((section, idx) => (
                    <div key={idx} className={styles.contentSection}>
                        <h4>{section.title}</h4>
                        {isContentArray(section.content) ? (
                            <ul className={styles.contentList}>
                                {section.content.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>{section.content}</p>
                        )}
                    </div>
                ))}
                {footer && (
                    <div className={styles.contentFooter}>
                        <p>{footer}</p>
                    </div>
                )}
            </div>
        </Modal>
    );
};