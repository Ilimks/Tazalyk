'use client'
import { useState, useEffect } from 'react';
import { PhotoCard } from '../PhotoCard';
import styles from './PhotoList.module.scss';
import mobile from './PhotoListMobile.module.scss';
import { api } from '@/shared/api/api';

interface Photo {
    id: string;
    title: string;
    description: string;
    main_image: string;
    gallery_images: string[];
    date: string;
    created_at: string;
    updated_at: string;
}

export const PhotoList: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadPhotos();
    }, []);

    const loadPhotos = async () => {
        try {
            setLoading(true);
            const data = await api.getPhotos();
            // Сортируем по дате (новые сверху)
            const sortedPhotos = [...data].sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateB - dateA;
            });
            setPhotos(sortedPhotos);
            setError(null);
        } catch (err) {
            console.error('Error loading photos:', err);
            setError('Не удалось загрузить фотографии');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={`${styles.photoList} ${mobile.photoList}`}>
                <div className={styles.loaderContainer}>
                    <div className={styles.loader}></div>
                    <p>Загрузка фотографий...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${styles.photoList} ${mobile.photoList}`}>
                <div className={styles.errorContainer}>
                    <p>{error}</p>
                    <button onClick={loadPhotos} className={styles.retryBtn}>
                        Попробовать снова
                    </button>
                </div>
            </div>
        );
    }

    if (photos.length === 0) {
        return (
            <div className={`${styles.photoList} ${mobile.photoList}`}>
                <div className={styles.emptyContainer}>
                    <p>Фотографий пока нет</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.photoList} ${mobile.photoList}`}>
            <div className={styles.photosGrid}>
                {photos.map((photo) => (
                    <PhotoCard key={photo.id} photo={photo} />
                ))}
            </div>
        </div>
    );
};