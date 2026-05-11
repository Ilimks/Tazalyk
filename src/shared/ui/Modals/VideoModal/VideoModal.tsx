'use client'
import { useEffect, useState, useMemo } from 'react';
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

    const allVideos = useMemo(() => {
        const unique = [videoUrl, ...galleryVideos].filter((url, index, self) => 
            url && self.indexOf(url) === index
        );
        return unique;
    }, [videoUrl, galleryVideos]);

    useEffect(() => {
        if (isOpen) {
            setCurrentVideo(videoUrl);
        }
    }, [isOpen, videoUrl]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
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

    const switchVideo = (newUrl: string) => {
        if (newUrl === currentVideo) return;
        setCurrentVideo(newUrl);
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

    if (!isOpen) return null;

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
                
                <div className={styles.videoContainer}>
                    <video 
                        key={currentVideo}
                        src={currentVideo}
                        controls
                        autoPlay
                        className={styles.videoPlayer}
                        controlsList="nodownload"
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
                                    key={url}
                                    className={`${styles.galleryItem} ${currentVideo === url ? styles.active : ''}`}
                                    onClick={() => switchVideo(url)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && switchVideo(url)}
                                >
                                    <video 
                                        src={url} 
                                        className={styles.galleryVideo}
                                        muted
                                        preload="metadata"
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