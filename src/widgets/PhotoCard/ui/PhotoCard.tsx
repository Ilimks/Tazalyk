'use client'
import styles from "./PhotoCard.module.scss";
import mobile from "./PhotoCardMobile.module.scss";
import { useState } from "react";
import { PhotoModal } from "./PhotoModal/PhotoModal";

// Тип для фото из API
interface Photo {
    id: string;
    title: string;
    description: string;
    main_image?: string;
    mainImage?: string;
    image?: string;
    gallery_images?: string[];
    date: string;
    created_at: string;
    updated_at?: string;
}

interface PhotoCardProps {
    photo?: Photo;
}

// Заглушка для фото
const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200' viewBox='0 0 320 200'%3E%3Crect width='320' height='200' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2394a3b8' font-size='14'%3EНет фото%3C/text%3E%3C/svg%3E";

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Защита от undefined
    const currentPhoto = photo || {
        id: "0",
        title: "Загрузка...",
        description: "",
        date: new Date().toISOString(),
        created_at: new Date().toISOString()
    } as Photo;

    // Получение URL изображения
    const getImageUrl = (): string => {
        if (imgError) return PLACEHOLDER_IMAGE;
        
        const url = currentPhoto.main_image || 
                   currentPhoto.mainImage || 
                   currentPhoto.image;
        
        if (url && url.startsWith('data:image')) {
            return url;
        }
        
        return url || PLACEHOLDER_IMAGE;
    };

    // Форматирование даты
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Дата неизвестна';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch {
            return 'Дата неизвестна';
        }
    };

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleImageError = () => {
        setImgError(true);
    };

    const imageUrl = getImageUrl();
    const galleryCount = currentPhoto.gallery_images?.length || 0;
    const totalPhotos = galleryCount + 1;
    const allImages = [imageUrl, ...(currentPhoto.gallery_images || [])];

    return (
        <>
            <article 
                className={`${styles.card} ${mobile.card}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleCardClick}
            >
                <div className={`${styles.card__imageContainer} ${mobile.card__imageContainer}`}>
                    <img 
                        src={imageUrl}
                        alt={currentPhoto.title || "Фото"}
                        className={`${styles.card__image} ${mobile.card__image} ${isHovered ? styles.card__imageZoomed : ''}`}
                        onError={handleImageError}
                    />
                    {totalPhotos > 1 && (
                        <div className={styles.card__photoCount}>
                            <span>📷 {totalPhotos}</span>
                        </div>
                    )}
                </div>
                <div className={`${styles.card__content} ${mobile.card__content}`}>
                    <time className={`${styles.card__content__date} ${mobile.card__content__date}`}>
                        {formatDate(currentPhoto.date)}
                    </time>
                    <h3 className={`${styles.card__content__title} ${mobile.card__content__title} ${isHovered ? styles.card__content__titleHovered : ''}`}>
                        {currentPhoto.title || "Без названия"}
                    </h3>
                </div>
            </article>

            <PhotoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                images={allImages}
                title={currentPhoto.title || "Фото"}
                description={currentPhoto.description}
                date={currentPhoto.date}
            />
        </>
    );
};