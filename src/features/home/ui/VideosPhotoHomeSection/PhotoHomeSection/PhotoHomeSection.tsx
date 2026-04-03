'use client'
import { useState, useEffect } from 'react';
import { PhotoCard } from '@/widgets/PhotoCard/ui/PhotoCard';
import styles from './PhotoHomeSection.module.scss';
import mobile from './PhotoHomeSectionMobile.module.scss';
import { api } from '@/shared/api/api';

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

export const PhotoHomeSection: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadPhotos();
    }, []);

    const loadPhotos = async () => {
        try {
            setLoading(true);
            console.log('Loading photos from API...');
            const data = await api.getPhotos();
            console.log('Photos received:', data);
            
            if (data && Array.isArray(data)) {
                // Сортируем по дате (новые сверху) и берем первые 4 для главной
                const sortedPhotos = [...data].sort((a, b) => {
                    const dateA = new Date(a.date || a.created_at).getTime();
                    const dateB = new Date(b.date || b.created_at).getTime();
                    return dateB - dateA;
                });
                // Берем первые 4 фото для главной страницы
                const recentPhotos = sortedPhotos.slice(0, 4);
                setPhotos(recentPhotos);
                console.log('Recent photos for home:', recentPhotos);
            } else {
                console.error('API returned non-array data:', data);
                setPhotos([]);
            }
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
            <div className={`${styles.photoHome} ${mobile.photoHome}`}>
                <div className={styles.loaderContainer}>
                    <div className={styles.loader}></div>
                    <p>Загрузка фотографий...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${styles.photoHome} ${mobile.photoHome}`}>
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
            <div className={`${styles.photoHome} ${mobile.photoHome}`}>
                <div className={styles.emptyContainer}>
                    <p>Фотографий пока нет</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.photoHome} ${mobile.photoHome}`}>
            {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
            ))}
        </div>
    );
};