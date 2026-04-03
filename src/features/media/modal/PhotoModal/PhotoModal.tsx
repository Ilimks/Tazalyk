'use client';
import { useEffect, useState } from 'react';
import styles from './PhotoModal.module.scss';

interface PhotoModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    title: string;
    description?: string;
    date?: string;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
    isOpen,
    onClose,
    images,
    title,
    description,
    date
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
            setCurrentIndex(0);
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

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>✕</button>

                {images.length > 1 && (
                    <button className={styles.navArrow} onClick={prevImage}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    </button>
                )}

                <div className={styles.imageWrapper}>
                    <div className={styles.imageContainer}>
                        <img src={images[currentIndex]} alt={title} className={styles.modalImage} />
                    </div>
                    {images.length > 1 && (
                        <div className={styles.imageCounter}>
                            {currentIndex + 1} / {images.length}
                        </div>
                    )}
                </div>

                {images.length > 1 && (
                    <button className={`${styles.navArrow} ${styles.navArrowRight}`} onClick={nextImage}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    </button>
                )}

                <div className={styles.modalInfo}>
                    <h3>{title}</h3>
                    {description && <p>{description}</p>}
                    {date && <time>{formatDate(date)}</time>}
                </div>
            </div>
        </div>
    );
};