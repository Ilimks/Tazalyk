'use client'
import { useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, Play, X } from 'lucide-react';
import styles from './VideoModal.module.scss';

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoUrl: string;
    // превью основного видео: показывается, пока видео загружается
    poster?: string;
    date?: string;
    galleryVideos?: string[];
}

export const VideoModal: React.FC<VideoModalProps> = ({ 
    isOpen, 
    onClose, 
    videoUrl,
    poster,
    date,
    galleryVideos = []
}) => {
    const t = useTranslations('MediaGallery');
    const tCommon = useTranslations('Common');
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
                    aria-label={tCommon('close')}
                >
                    <X size={22} aria-hidden />
                </button>
                
                <div className={styles.videoContainer}>
                    <video 
                        key={currentVideo}
                        src={currentVideo}
                        controls
                        autoPlay
                        playsInline
                        poster={currentVideo === videoUrl ? poster : undefined}
                        className={styles.videoPlayer}
                        controlsList="nodownload"
                    />
                </div>
                
                {date && (
                    <div className={styles.videoDate}>
                        <Calendar size={16} aria-hidden />
                        <span>{formatDate(date)}</span>
                    </div>
                )}
                
                {allVideos.length > 1 && (
                    <div className={styles.gallery}>
                        <h4 className={styles.galleryTitle}>{t('allVideos', { count: allVideos.length })}</h4>
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
                                    {/* видео частей не загружаются, пока их не выбрали */}
                                    {index === 0 && poster ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={poster} alt="" className={styles.galleryVideo} loading="lazy" />
                                    ) : (
                                        <div className={styles.galleryThumb}>
                                            <Play size={20} fill="currentColor" aria-hidden />
                                        </div>
                                    )}
                                    <span>{index === 0 ? t('main') : t('videoPart', { number: index + 1 })}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};