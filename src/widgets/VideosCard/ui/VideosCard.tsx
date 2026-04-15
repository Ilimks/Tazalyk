'use client'
import styles from "./VideosCard.module.scss";
import mobile from "./VideosCardMobile.module.scss";
import { useState, useRef, useEffect } from "react";
import { VideoModal } from "./VideoModal/VideoModal";

interface Video {
    id: string;
    // title - УДАЛЕН
    // description - УДАЛЕН
    main_video_url: string;
    gallery_videos: string[];
    date: string;
    created_at: string;
}

interface VideoCardProps {
    video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Форматирование даты
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Используем Intersection Observer для загрузки видео при появлении в области видимости
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !shouldLoadVideo) {
                    setShouldLoadVideo(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 } // Когда 10% карточки видно
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [shouldLoadVideo]);

    // Загрузка видео при наведении (если еще не загружено)
    const handleMouseEnter = () => {
        setIsHovered(true);
        if (!shouldLoadVideo) {
            setShouldLoadVideo(true);
        }
    };

    const handleVideoLoad = () => {
        setIsVideoLoaded(true);
    };

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const allVideos = [video.main_video_url, ...(video.gallery_videos || [])];

    return (
        <>
            <article 
                ref={containerRef}
                className={`${styles.card} ${mobile.card}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleCardClick}
            >
                <div className={`${styles.card__imageContainer} ${mobile.card__imageContainer}`}>
                    {shouldLoadVideo ? (
                        <video 
                            ref={videoRef}
                            src={video.main_video_url}
                            className={`${styles.card__video} ${mobile.card__video} ${isHovered ? styles.card__videoZoomed : ''}`}
                            muted
                            preload="metadata"
                            loop
                            onLoadedData={handleVideoLoad}
                        />
                    ) : (
                        <div className={styles.card__thumbnail}>
                            {/* Постер/превью - можно добавить скриншот из видео */}
                            <div className={styles.card__thumbnailPlaceholder}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                                    <polygon points="10 8 16 12 10 16" fill="currentColor"/>
                                </svg>
                            </div>
                        </div>
                    )}
                    <div className={`${styles.card__playIcon} ${mobile.card__playIcon}`}>
                        <span>▶</span>
                    </div>
                    {video.gallery_videos?.length > 0 && (
                        <span className={styles.card__galleryCount}>
                            🎬 {video.gallery_videos.length + 1}
                        </span>
                    )}
                </div>
                <div className={`${styles.card__content} ${mobile.card__content}`}>
                    <time className={`${styles.card__content__date} ${mobile.card__content__date}`}>
                        {formatDate(video.date)}
                    </time>
                    {/* <h3> с title - УДАЛЕН */}
                </div>
            </article>

            <VideoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                videoUrl={video.main_video_url}
                galleryVideos={video.gallery_videos}
            />
        </>
    );
};