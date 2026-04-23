// shared/ui/Modal/Modal.tsx
import React, { useEffect } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md'
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div 
                className={`${styles.modalContent} ${styles[size]}`} 
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className={styles.modalHeader}>
                        <h3>{title}</h3>
                        <button 
                            className={styles.modalClose} 
                            onClick={onClose}
                            aria-label="Закрыть"
                        >
                            ×
                        </button>
                    </div>
                )}
                <div className={styles.modalBody}>
                    {children}
                </div>
                {footer && (
                    <div className={styles.modalFooter}>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};