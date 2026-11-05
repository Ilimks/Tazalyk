'use client'
import { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { VideoCard } from '@/shared/ui/Cards/VideoCard';
import { ErrorState } from '@/shared/ui/ErrorState';
import { EmptyState } from '@/shared/ui/EmptyState';
import styles from './VideosHomeSection.module.scss';
import mobile from './VideosHomeSectionMobile.module.scss';
import { LoadingState } from '@/shared/ui/LoadingState';
import { useVideos } from '@/features/media/model/useVideos';

export const VideosHomeSection: React.FC = () => {
    const t = useTranslations('LoadErrors');
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
        let errorTitle = t('videos.title');
        let errorMessage = error;

        if (error.includes("404")) {
            errorTitle = t('videos.notFoundTitle');
            errorMessage = t('videos.notFoundMessage');
        } else if (error.includes("network") || error.includes("fetch")) {
            errorTitle = t('connectionTitle');
            errorMessage = t('videos.connectionMessage');
        } else if (error.includes("timeout")) {
            errorTitle = t('timeoutTitle');
            errorMessage = t('timeoutMessage');
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
                <EmptyState variant="video" />
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