'use client'
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
    const [currentVideo, setCurrentVideo] = useState(videoUrl);
    const [currentTitle, setCurrentTitle] = useState(title);

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
            setCurrentTitle(title);
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, videoUrl, title]);

    const switchVideo = (newUrl: string, newTitle: string) => {
        setCurrentVideo(newUrl);
        setCurrentTitle(newTitle);
    };

    if (!isOpen) return null;

    // Все видео: главное + дополнительные
    const allVideos = [
        { url: videoUrl, title: title },
        ...galleryVideos.map((url, index) => ({ 
            url, 
            title: `${title} (часть ${index + 2})` 
        }))
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
                <h3 className={styles.videoTitle}>{currentTitle}</h3>
                
                {allVideos.length > 1 && (
                    <div className={styles.gallery}>
                        <h4 className={styles.galleryTitle}>Все видео ({allVideos.length})</h4>
                        <div className={styles.galleryList}>
                            {allVideos.map((video, index) => (
                                <div 
                                    key={index}
                                    className={`${styles.galleryItem} ${currentVideo === video.url ? styles.active : ''}`}
                                    onClick={() => switchVideo(video.url, video.title)}
                                >
                                    <video 
                                        src={video.url} 
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