'use client'
import styles from "./VideoCard.module.scss";
import { useState, useRef, useEffect } from "react";
import { VideoModal } from "@/shared/ui/Modals/VideoModal";

interface Video {
    id: string;
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
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !shouldLoadVideo) {
                    setShouldLoadVideo(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [shouldLoadVideo]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (!shouldLoadVideo) {
            setShouldLoadVideo(true);
        }
    };

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <article 
                ref={containerRef}
                className={styles.card}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleCardClick}
            >
                <div className={styles.card__imageContainer}>
                    {shouldLoadVideo ? (
                        <video 
                            ref={videoRef}
                            src={video.main_video_url}
                            className={`${styles.card__video} ${isHovered ? styles.card__videoZoomed : ''}`}
                            muted
                            preload="metadata"
                            loop
                        />
                    ) : (
                        <div className={styles.card__thumbnail}>
                            <div className={styles.card__thumbnailPlaceholder}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                                    <polygon points="10 8 16 12 10 16" fill="currentColor"/>
                                </svg>
                            </div>
                        </div>
                    )}
                    <div className={styles.card__playIcon}>
                        <span>▶</span>
                    </div>
                    {video.gallery_videos?.length > 0 && (
                        <span className={styles.card__galleryCount}>
                            🎬 {video.gallery_videos.length + 1}
                        </span>
                    )}
                </div>
                <div className={styles.card__content}>
                    <time className={styles.card__content__date}>
                        {formatDate(video.date)}
                    </time>
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