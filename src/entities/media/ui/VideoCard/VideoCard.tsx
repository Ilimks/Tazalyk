'use client';
import { useState } from 'react';
import { Video } from '../../model/types';
import styles from './VideoCard.module.scss';
import mobile from './VideoCardMobile.module.scss';

interface VideoCardProps {
    video: Video;
    onClick?: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatDuration = (base64: string) => {
        const sizeInMB = (base64.length * 0.75) / (1024 * 1024);
        return `${Math.round(sizeInMB)} MB`;
    };

    return (
        <article 
            className={`${styles.card} ${mobile.card}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <div className={`${styles.card__imageContainer} ${mobile.card__imageContainer}`}>
                <video 
                    src={video.main_video_url}
                    className={`${styles.card__video} ${mobile.card__video} ${isHovered ? styles.card__videoZoomed : ''}`}
                    muted
                    preload="metadata"
                />
                <div className={styles.card__playIcon}>
                    <span>▶</span>
                </div>
                <span className={styles.card__duration}>
                    {formatDuration(video.main_video_url)}
                </span>
                {video.gallery_videos?.length > 0 && (
                    <span className={styles.card__galleryCount}>
                        🎬 {video.gallery_videos.length + 1}
                    </span>
                )}
            </div>
            <div className={`${styles.card__content} ${mobile.card__content}`}>
                <time className={styles.card__content__date}>
                    {formatDate(video.date)}
                </time>
                <h3 className={`${styles.card__content__title} ${isHovered ? styles.card__content__titleHovered : ''}`}>
                    {video.title}
                </h3>
            </div>
        </article>
    );
};