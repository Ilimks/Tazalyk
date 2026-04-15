'use client'
import { useEffect, useState } from 'react';
import styles from './VideoModal.module.scss';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
    date?: string;
    galleryVideos?: string[];
}

export const VideoModal: React.FC<VideoModalProps> = ({ 
    isOpen, 
    onClose, 
    videoUrl,
    date,
    galleryVideos = []
}) => {
    const [currentVideo, setCurrentVideo] = useState(videoUrl);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
            setCurrentVideo(videoUrl);
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, videoUrl]);

    const switchVideo = (newUrl: string) => {
        setCurrentVideo(newUrl);
    };

    // Форматирование даты
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

    if (!isOpen) return null;

    // Все видео: главное + дополнительные
    const allVideos = [
        videoUrl,
        ...galleryVideos
    ];

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    ✕
                </button>
                <div className={styles.videoContainer}>
                    <video 
                        src={currentVideo}
                        controls
                        autoPlay
                        className={styles.videoPlayer}
                    />
                </div>
                
                {date && (
                    <div className={styles.videoDate}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 4h-2V2h-2v2H9V2H7v2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM8 2v2M16 2v2M3 8h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span>{formatDate(date)}</span>
                    </div>
                )}
                
                {allVideos.length > 1 && (
                    <div className={styles.gallery}>
                        <h4 className={styles.galleryTitle}>Все видео ({allVideos.length})</h4>
                        <div className={styles.galleryList}>
                            {allVideos.map((url, index) => (
                                <div 
                                    key={index}
                                    className={`${styles.galleryItem} ${currentVideo === url ? styles.active : ''}`}
                                    onClick={() => switchVideo(url)}
                                >
                                    <video 
                                        src={url} 
                                        className={styles.galleryVideo}
                                        muted
                                    />
                                    <span>{index === 0 ? 'Главное' : `Часть ${index + 1}`}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};