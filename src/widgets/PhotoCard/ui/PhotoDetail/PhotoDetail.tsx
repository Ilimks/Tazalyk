'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './PhotoDetail.module.scss';
import mobile from './PhotoDetailMobile.module.scss';
import { photosApi } from '@/shared/api';
import type { Photo } from '@/shared/api';

export const PhotoDetail: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const [photo, setPhoto] = useState<Photo | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const photoId = params?.id as string;

    useEffect(() => {
        if (photoId) {
            loadPhotoDetail();
        }
    }, [photoId]);

    const loadPhotoDetail = async () => {
        try {
            setLoading(true);
            // Загружаем конкретное фото по ID
            const currentPhoto = await photosApi.getById(photoId);
            
            if (currentPhoto) {
                setPhoto(currentPhoto);
                setSelectedImage(currentPhoto.main_image);
            } else {
                setError('Фото не найдено');
            }
        } catch (err) {
            console.error('Error loading photo:', err);
            setError('Не удалось загрузить фото');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className={`${styles.photoDetail} ${mobile.photoDetail}`}>
                <div className="container">
                    <div className={styles.loaderContainer}>
                        <div className={styles.loader}></div>
                        <p>Загрузка...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !photo) {
        return (
            <div className={`${styles.photoDetail} ${mobile.photoDetail}`}>
                <div className="container">
                    <div className={styles.errorContainer}>
                        <h2>Фото не найдено</h2>
                        <p>{error || 'Запрашиваемое фото не существует'}</p>
                        <button onClick={() => router.push('/media')} className={styles.backBtn}>
                            Вернуться в галерею
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const allImages = [photo.main_image, ...(photo.gallery_images || [])];

    return (
        <div className={`${styles.photoDetail} ${mobile.photoDetail}`}>
            <div className="container">
                <button onClick={() => router.back()} className={styles.backButton}>
                    ← Назад к галерее
                </button>

                <div className={styles.photoContainer}>
                    {/* Основное изображение */}
                    <div className={styles.mainImageWrapper}>
                        <img 
                            src={selectedImage} 
                            alt="Фото"
                            className={styles.mainImage}
                        />
                    </div>

                    {/* Информация */}
                    <div className={styles.photoInfo}>
                        <time className={styles.date}>{formatDate(photo.date)}</time>
                        {/* У фото нет title и description, поэтому убираем */}
                    </div>

                    {/* Галерея миниатюр */}
                    {allImages.length > 1 && (
                        <div className={styles.gallerySection}>
                            <h3 className={styles.galleryTitle}>
                                Все фото ({allImages.length})
                            </h3>
                            <div className={styles.thumbnailsGrid}>
                                {allImages.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.thumbnail} ${selectedImage === img ? styles.thumbnailActive : ''}`}
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <img src={img} alt={`Фото ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};