'use client';
import { useState } from 'react';
import { Photo } from '../../model/types';
import styles from './PhotoCard.module.scss';
import mobile from './PhotoCardMobile.module.scss';

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='200' viewBox='0 0 320 200'%3E%3Crect width='320' height='200' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2394a3b8' font-size='14'%3EНет фото%3C/text%3E%3C/svg%3E";

interface PhotoCardProps {
    photo: Photo;
    onClick?: () => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imgError, setImgError] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const imageUrl = imgError ? PLACEHOLDER_IMAGE : (photo.main_image || PLACEHOLDER_IMAGE);
    const totalPhotos = (photo.gallery_images?.length || 0) + 1;

    return (
        <article 
            className={`${styles.card} ${mobile.card}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <div className={`${styles.card__imageContainer} ${mobile.card__imageContainer}`}>
                <img 
                    src={imageUrl}
                    alt={photo.title}
                    className={`${styles.card__image} ${mobile.card__image} ${isHovered ? styles.card__imageZoomed : ''}`}
                    onError={() => setImgError(true)}
                />
                {totalPhotos > 1 && (
                    <div className={styles.card__photoCount}>
                        <span>📷 {totalPhotos}</span>
                    </div>
                )}
            </div>
            <div className={`${styles.card__content} ${mobile.card__content}`}>
                <time className={styles.card__content__date}>
                    {formatDate(photo.date)}
                </time>
                <h3 className={`${styles.card__content__title} ${isHovered ? styles.card__content__titleHovered : ''}`}>
                    {photo.title}
                </h3>
            </div>
        </article>
    );
};