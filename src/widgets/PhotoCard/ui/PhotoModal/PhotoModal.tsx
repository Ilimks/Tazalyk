'use client'
import { useEffect, useState } from 'react';
import styles from './PhotoModal.module.scss';

interface PhotoModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    date?: string;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ 
    isOpen, 
    onClose, 
    images,
    date
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
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

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (images.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (images.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        }
    };

    const selectImage = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex(index);
    };

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
                <button className={styles.closeBtn} onClick={onClose}>
                    ✕
                </button>
                
                {/* Стрелка влево */}
                {images.length > 1 && (
                    <button className={styles.navArrow} onClick={prevImage}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                )}
                
                {/* Основное изображение - с фиксированной высотой */}
                <div className={styles.imageWrapper}>
                    <div className={styles.imageContainer}>
                        <img 
                            src={images[currentIndex]}
                            alt={`Фото ${currentIndex + 1}`}
                            className={styles.modalImage}
                        />
                    </div>
                    {images.length > 1 && (
                        <div className={styles.imageCounter}>
                            {currentIndex + 1} / {images.length}
                        </div>
                    )}
                </div>
                
                {/* Стрелка вправо */}
                {images.length > 1 && (
                    <button className={`${styles.navArrow} ${styles.navArrowRight}`} onClick={nextImage}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                )}
                
                <div className={styles.modalInfo}>
                    {date && <time>{formatDate(date)}</time>}
                    
                    {images.length > 1 && (
                        <div className={styles.modalGallery}>
                            <h4>Все фото ({images.length})</h4>
                            <div className={styles.galleryList}>
                                {images.map((img, index) => (
                                    <div 
                                        key={index} 
                                        className={`${styles.galleryItem} ${currentIndex === index ? styles.active : ''}`}
                                        onClick={(e) => selectImage(index, e)}
                                    >
                                        <div className={styles.galleryImageWrapper}>
                                            <img src={img} alt={`Фото ${index + 1}`} />
                                        </div>
                                        <span>{index === 0 ? 'Главное' : `Фото ${index + 1}`}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};