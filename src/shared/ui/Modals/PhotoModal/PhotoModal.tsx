'use client';
import { useEffect, useState, useRef, useMemo } from 'react';
import Image from 'next/image';
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
    images: initialImages,
    date
}) => {
    const [currentImage, setCurrentImage] = useState('');
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [imageError, setImageError] = useState<Set<string>>(new Set());

    const allImages = useMemo(() => {
        const unique = initialImages.filter((url, index, self) => 
            url && self.indexOf(url) === index
        );
        return unique;
    }, [initialImages]);

    useEffect(() => {
        if (isOpen && allImages.length > 0) {
            setCurrentImage(allImages[0]);
        }
    }, [isOpen, allImages]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            
            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, currentImage]);

    const switchImage = (newUrl: string) => {
        if (newUrl === currentImage) return;
        setCurrentImage(newUrl);
    };

    const nextImage = () => {
        const currentIndex = allImages.findIndex(img => img === currentImage);
        if (currentIndex < allImages.length - 1) {
            setCurrentImage(allImages[currentIndex + 1]);
        }
    };

    const prevImage = () => {
        const currentIndex = allImages.findIndex(img => img === currentImage);
        if (currentIndex > 0) {
            setCurrentImage(allImages[currentIndex - 1]);
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;
        
        if (isLeftSwipe) {
            nextImage();
        } else if (isRightSwipe) {
            prevImage();
        }
        
        setTouchStart(null);
        setTouchEnd(null);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch {
            return '';
        }
    };

    const handleImageError = (url: string) => {
        setImageError(prev => new Set([...prev, url]));
    };

    if (!isOpen) return null;

    const hasMultipleImages = allImages.length > 1;
    const currentImageHasError = imageError.has(currentImage);
    const currentImageUrl = currentImageHasError ? '/placeholder-image.jpg' : currentImage;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button 
                    className={styles.closeBtn} 
                    onClick={onClose}
                    aria-label="Закрыть"
                >
                    ✕
                </button>
                
                <div 
                    className={styles.imageContainer}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {hasMultipleImages && (
                        <button 
                            className={styles.navArrow} 
                            onClick={prevImage}
                            aria-label="Предыдущее фото"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    )}
                    
                    <div className={styles.imageWrapper}>
                        {currentImage && (
                            <Image 
                                key={currentImage}
                                src={currentImageUrl}
                                alt={`Фото`}
                                className={styles.modalImage}
                                width={1200}
                                height={800}
                                priority
                                onError={() => handleImageError(currentImage)}
                            />
                        )}
                    </div>
                    
                    {hasMultipleImages && (
                        <button 
                            className={`${styles.navArrow} ${styles.navArrowRight}`} 
                            onClick={nextImage}
                            aria-label="Следующее фото"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    )}
                </div>

                {hasMultipleImages && (
                    <div className={styles.counter}>
                        {allImages.findIndex(img => img === currentImage) + 1} / {allImages.length}
                    </div>
                )}
                
                {date && (
                    <div className={styles.imageDate}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 4h-2V2h-2v2H9V2H7v2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM8 2v2M16 2v2M3 8h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span>{formatDate(date)}</span>
                    </div>
                )}
                
                {hasMultipleImages && (
                    <div className={styles.gallery}>
                        <h4 className={styles.galleryTitle}>Все фото ({allImages.length})</h4>
                        <div className={styles.galleryList}>
                            {allImages.map((url, index) => (
                                <div 
                                    key={url} 
                                    className={`${styles.galleryItem} ${currentImage === url ? styles.active : ''}`}
                                    onClick={() => switchImage(url)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && switchImage(url)}
                                >
                                    <div className={styles.galleryImageWrapper}>
                                        <Image 
                                            src={url} 
                                            alt={`Фото ${index + 1}`}
                                            className={styles.galleryImage}
                                            width={140}
                                            height={80}
                                            loading="lazy"
                                            onError={() => handleImageError(url)}
                                        />
                                    </div>
                                    <span>{index === 0 ? 'Главное' : `Фото ${index + 1}`}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};