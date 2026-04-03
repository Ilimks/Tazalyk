'use client'
import styles from "./VideosCard.module.scss";
import mobile from "./VideosCardMobile.module.scss";
import { useState } from "react";
import { VideoModal } from "./VideoModal/VideoModal";

interface Video {
    id: string;
    title: string;
    description: string;
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

    // Форматирование даты
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Форматирование размера видео
    const formatDuration = (base64: string) => {
        const sizeInMB = (base64.length * 0.75) / (1024 * 1024);
        return `${Math.round(sizeInMB)} MB`;
    };

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const allVideos = [video.main_video_url, ...(video.gallery_videos || [])];

    return (
        <>
            <article 
                className={`${styles.card} ${mobile.card}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleCardClick}
            >
                <div className={`${styles.card__imageContainer} ${mobile.card__imageContainer}`}>
                    <video 
                        src={video.main_video_url}
                        className={`${styles.card__video} ${mobile.card__video} ${isHovered ? styles.card__videoZoomed : ''}`}
                        muted
                        preload="metadata"
                    />
                    <div className={`${styles.card__playIcon} ${mobile.card__playIcon}`}>
                        <span>▶</span>
                    </div>
                    <span className={`${styles.card__duration} ${mobile.card__duration}`}>
                        {formatDuration(video.main_video_url)}
                    </span>
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
                    <h3 className={`${styles.card__content__title} ${mobile.card__content__title} ${isHovered ? styles.card__content__titleHovered : ''}`}>
                        {video.title}
                    </h3>
                </div>
            </article>

            <VideoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                videoUrl={video.main_video_url}
                title={video.title}
                galleryVideos={video.gallery_videos}
            />
        </>
    );
};