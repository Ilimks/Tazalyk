'use client'
import styles from "./PhotoCard.module.scss";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { mediaCaption } from "@/entities/media/lib/caption";
import { PhotoModal } from "@/shared/ui/Modals/PhotoModal";

interface Photo {
    id: string;
    main_image?: string;
    mainImage?: string;
    image?: string;
    caption_ru?: string;
    caption_ky?: string;
    date: string;
    created_at: string;
    updated_at?: string;
}

interface PhotoCardProps {
    photo?: Photo;
}

const getPlaceholderImage = (text: string) => `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200' viewBox='0 0 320 200'%3E%3Crect width='320' height='200' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2394a3b8' font-size='14'%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E`;

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
    const t = useTranslations("MediaGallery");
    const locale = useLocale();
    const placeholderImage = getPlaceholderImage(t('noPhoto'));
    const [isHovered, setIsHovered] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const currentPhoto = photo || {
        id: "0",
        description: "",
        date: new Date().toISOString(),
        created_at: new Date().toISOString()
    } as Photo;

    const getImageUrl = (): string => {
        if (imgError) return placeholderImage;
        
        const url = currentPhoto.main_image || 
                   currentPhoto.mainImage || 
                   currentPhoto.image;
        
        if (url && url.startsWith('data:image')) {
            return url;
        }
        
        return url || placeholderImage;
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return t('dateUnknown');
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch {
            return t('dateUnknown');
        }
    };

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleImageError = () => {
        setImgError(true);
    };

    const imageUrl = getImageUrl();
    const caption = mediaCaption(currentPhoto, locale);

    return (
        <>
            <article
                data-reveal suppressHydrationWarning
                data-snow
                className={styles.card}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleCardClick}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick();
                    }
                }}
                role="button"
                tabIndex={0}
                aria-label={`${t('photo')}: ${caption || formatDate(currentPhoto.date)}`}
            >
                <div className={styles.card__imageContainer}>
                    <Image
                        src={imageUrl}
                        alt=""
                        fill
                        sizes="(max-width: 1000px) 50vw, 640px"
                        className={`${styles.card__image} ${isHovered ? styles.card__imageZoomed : ''}`}
                        onError={handleImageError}
                    />
                </div>
                <div className={styles.card__content}>
                    {caption && <p className={styles.card__caption}>{caption}</p>}
                    <time className={styles.card__content__date}>
                        <Calendar size={14} aria-hidden />
                        {formatDate(currentPhoto.date)}
                    </time>
                </div>
            </article>

            <PhotoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                images={[imageUrl]}
                date={currentPhoto.date}
                caption={caption}
            />
        </>
    );
};