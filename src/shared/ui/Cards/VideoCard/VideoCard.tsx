'use client'
import styles from "./VideoCard.module.scss";
import { Calendar, Film, Play, Video as VideoIcon } from "lucide-react";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { mediaCaption } from "@/entities/media/lib/caption";
import { VideoModal } from "@/shared/ui/Modals/VideoModal";

interface Video {
    id: string;
    main_video_url: string;
    gallery_videos: string[];
    thumbnail?: string;
    caption_ru?: string;
    caption_ky?: string;
    date: string;
    created_at: string;
}

interface VideoCardProps {
    video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    const t = useTranslations("MediaGallery");
    const locale = useLocale();
    const caption = mediaCaption(video, locale);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [thumbnailFailed, setThumbnailFailed] = useState(false);
    const showThumbnail = Boolean(video.thumbnail) && !thumbnailFailed;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const openModal = () => setIsModalOpen(true);

    return (
        <>
            <article
                data-reveal suppressHydrationWarning
                data-snow
                className={styles.card}
                onClick={openModal}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal();
                    }
                }}
                role="button"
                tabIndex={0}
                aria-label={`${t('videos')}: ${caption || formatDate(video.date)}`}
            >
                <div className={styles.card__imageContainer}>
                    {showThumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={video.thumbnail}
                            alt=""
                            className={styles.card__video}
                            loading="lazy"
                            decoding="async"
                            onError={() => setThumbnailFailed(true)}
                        />
                    ) : (
                        <div className={styles.card__placeholder}>
                            <VideoIcon size={48} strokeWidth={1.5} aria-hidden />
                        </div>
                    )}
                    <div className={styles.card__playIcon}>
                        <Play className={styles.card__playGlyph} size={20} fill="currentColor" aria-hidden />
                    </div>
                    {video.gallery_videos?.length > 0 && (
                        <span className={styles.card__galleryCount}>
                            <Film size={12} aria-hidden />
                            {video.gallery_videos.length + 1}
                        </span>
                    )}
                </div>
                <div className={styles.card__content}>
                    {caption && <p className={styles.card__caption}>{caption}</p>}
                    <time className={styles.card__content__date}>
                        <Calendar size={14} aria-hidden />
                        {formatDate(video.date)}
                    </time>
                </div>
            </article>

            <VideoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                videoUrl={video.main_video_url}
                poster={showThumbnail ? video.thumbnail : undefined}
                galleryVideos={video.gallery_videos}
                caption={caption}
            />
        </>
    );
};
