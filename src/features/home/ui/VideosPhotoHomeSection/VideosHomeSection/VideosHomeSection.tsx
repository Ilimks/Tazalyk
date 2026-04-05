'use client'
import { useState, useEffect } from 'react';
import { VideoCard } from '@/widgets/VideosCard/ui/VideosCard';
import styles from './VideosHomeSection.module.scss';
import mobile from './VideosHomeSectionMobile.module.scss';
import { api } from '@/shared/api/api';
import { Loading } from '@/shared/ui/Loading';

interface Video {
    id: string;
    title: string;
    description: string;
    main_video_url: string;
    gallery_videos: string[];
    date: string;
    created_at: string;
}

export const VideosHomeSection: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadVideos();
    }, []);

    const loadVideos = async () => {
        try {
            setLoading(true);
            const data = await api.getVideos();
            console.log('Videos loaded:', data);
            
            if (data && Array.isArray(data)) {
                // Сортируем по дате (новые сверху)
                const sortedVideos = [...data].sort((a, b) => {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    return dateB - dateA;
                });
                // Берем первые 4 видео для главной страницы
                const recentVideos = sortedVideos.slice(0, 4);
                setVideos(recentVideos);
            } else {
                setVideos([]);
            }
            setError(null);
        } catch (err) {
            console.error('Error loading videos:', err);
            setError('Не удалось загрузить видео');
            setVideos([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={`${styles.videosHome} ${mobile.videosHome}`}>
                <div className={styles.loaderContainer}>
                    <Loading/>
                    <p>Загрузка видео...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${styles.videosHome} ${mobile.videosHome}`}>
                <div className={styles.errorContainer}>
                    <p>{error}</p>
                    <button onClick={loadVideos} className={styles.retryBtn}>
                        Попробовать снова
                    </button>
                </div>
            </div>
        );
    }

    if (videos.length === 0) {
        return (
            <div className={`${styles.videosHome} ${mobile.videosHome}`}>
                <div className={styles.emptyContainer}>
                    <p>Видео пока нет</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.videosHome} ${mobile.videosHome}`}>
            {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
    );
};