'use client';
import { useEffect, useState } from 'react';
import styles from './VideoModal.module.scss';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
    title: string;
    galleryVideos?: string[];
}

export const VideoModal: React.FC<VideoModalProps> = ({
    isOpen,
    onClose,
    videoUrl,
    title,
    galleryVideos = []
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const allVideos = [videoUrl, ...galleryVideos];

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

    const nextVideo = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % allVideos.length);
    };

    const prevVideo = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + allVideos.length) % allVideos.length);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>✕</button>

                {allVideos.length > 1 && (
                    <button className={styles.navArrow} onClick={prevVideo}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    </button>
                )}

                <div className={styles.videoWrapper}>
                    <video 
                        src={allVideos[currentIndex]} 
                        controls 
                        autoPlay
                        className={styles.modalVideo}
                    />
                    {allVideos.length > 1 && (
                        <div className={styles.videoCounter}>
                            {currentIndex + 1} / {allVideos.length}
                        </div>
                    )}
                </div>

                {allVideos.length > 1 && (
                    <button className={`${styles.navArrow} ${styles.navArrowRight}`} onClick={nextVideo}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    </button>
                )}

                <div className={styles.modalInfo}>
                    <h3>{title}</h3>
                </div>
            </div>
        </div>
    );
};