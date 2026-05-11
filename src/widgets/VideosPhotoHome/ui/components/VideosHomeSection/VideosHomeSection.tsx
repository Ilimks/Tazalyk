'use client'
import { useState, useEffect, useRef, useMemo } from 'react';
import { VideoCard } from '@/shared/ui/Cards/VideoCard';
import { ErrorState } from '@/shared/ui/ErrorState';
import styles from './VideosHomeSection.module.scss';
import mobile from './VideosHomeSectionMobile.module.scss';
import { LoadingState } from '@/shared/ui/LoadingState';
import { useVideos } from '@/features/media/model/useVideos';

export const VideosHomeSection: React.FC = () => {
    const { videos, isLoading, error, loadVideos } = useVideos();
    const sectionRef = useRef<HTMLDivElement>(null);
    const [hasTriggeredLoad, setHasTriggeredLoad] = useState(false);
    
    const safeVideos = useMemo(() => Array.isArray(videos) ? videos : [], [videos]);
    
    const recentVideos = useMemo(() => {
        return safeVideos.slice(0, 4);
    }, [safeVideos]);

    useEffect(() => {
        if (safeVideos.length > 0 || hasTriggeredLoad) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasTriggeredLoad) {
                    loadVideos();
                    setHasTriggeredLoad(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            observer.disconnect();
        };
    }, [safeVideos.length, hasTriggeredLoad, loadVideos]);

    if (!hasTriggeredLoad && safeVideos.length === 0) {
        return (
            <div ref={sectionRef} className={`${styles.videosHome} ${mobile.videosHome}`}>
                <div className={styles.skeletonContainer}>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={styles.skeletonCard}>
                            <div className={styles.skeletonImage}></div>
                            <div className={styles.skeletonTitle}></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isLoading && safeVideos.length === 0) {
        return (
            <div className={`${styles.videosHome} ${mobile.videosHome}`}>
                <LoadingState />
            </div>
        );
    }

    if (error && safeVideos.length === 0) {
        let errorTitle = "Ошибка загрузки видео";
        let errorMessage = error;
        
        if (error.includes("404")) {
            errorTitle = "Видео не найдены";
            errorMessage = "Раздел видео временно недоступен. Пожалуйста, попробуйте позже.";
        } else if (error.includes("network") || error.includes("fetch")) {
            errorTitle = "Проблема с соединением";
            errorMessage = "Не удается загрузить видео. Проверьте подключение к интернету.";
        } else if (error.includes("timeout")) {
            errorTitle = "Превышено время ожидания";
            errorMessage = "Сервер долго не отвечает. Пожалуйста, попробуйте позже.";
        }
        
        return (
            <div className={`${styles.videosHome} ${mobile.videosHome}`}>
                <ErrorState 
                    error={errorMessage}
                    onRetry={() => {
                        setHasTriggeredLoad(false);
                        loadVideos();
                    }}
                    title={errorTitle}
                    variant="compact"
                />
            </div>
        );
    }

    if (recentVideos.length === 0 && !isLoading && hasTriggeredLoad) {
        return (
            <div className={`${styles.videosHome} ${mobile.videosHome}`}>
                <div className={styles.emptyContainer}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <polygon points="10 8 16 12 10 16" fill="currentColor"/>
                    </svg>
                    <p>Видео пока нет</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.videosHome} ${mobile.videosHome}`}>
            {recentVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
    );
};