import React, { useEffect } from 'react';
import styles from './DocumentModal.module.scss';

interface DocumentModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    date?: string;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
    isOpen,
    onClose,
    title,
    description,
    date
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

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>×</button>
                
                <div className={styles.modalHeader}>
                    <h2>{title}</h2>
                    {date && <time className={styles.modalDate}>{formatDate(date)}</time>}
                </div>
                
                <div className={styles.modalBody}>
                    {description && (
                        <div className={styles.textContent}>
                            <p>{description}</p>
                        </div>
                    )}
                </div>
                
                <div className={styles.modalFooter}>
                    <button className={styles.closeModalBtn} onClick={onClose}>
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};