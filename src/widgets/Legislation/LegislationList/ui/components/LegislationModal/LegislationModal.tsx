import React, { useEffect } from 'react';
import styles from './LegislationModal.module.scss';

interface LegislationModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    pdfUrl: string;
    onDownload: () => void;
}

export const LegislationModal: React.FC<LegislationModalProps> = ({
    isOpen,
    onClose,
    title,
    pdfUrl,
    onDownload
}) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>×</button>
                
                <div className={styles.modalHeader}>
                    <h2>{title}</h2>
                </div>
                
                <div className={styles.modalBody}>
                    <div className={styles.pdfViewer}>
                        <iframe
                            src={`${pdfUrl}#toolbar=0`}
                            title={title}
                            className={styles.pdfIframe}
                        />
                    </div>
                </div>
                
                <div className={styles.modalFooter}>
                    <button className={styles.downloadBtn} onClick={onDownload}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2"/>
                            <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2"/>
                            <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Скачать PDF
                    </button>
                    <button className={styles.closeModalBtn} onClick={onClose}>
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};