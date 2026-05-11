'use client'
import { useEffect, useRef, useMemo } from 'react';
import { PhotoCard } from '@/shared/ui/Cards/PhotoCard/PhotoCard';
import { ErrorState } from '@/shared/ui/ErrorState';
import styles from './PhotoHomeSection.module.scss';
import mobile from './PhotoHomeSectionMobile.module.scss';
import { LoadingState } from '@/shared/ui/LoadingState';
import { usePhotos } from '@/features/media/model/usePhotos';

export const PhotoHomeSection: React.FC = () => {
    const { photos, isLoading, error, loadPhotos } = usePhotos();
    const hasLoadedRef = useRef(false);

    useEffect(() => {
        if (!hasLoadedRef.current) {
            hasLoadedRef.current = true;
            loadPhotos();
        }
    }, [loadPhotos]);

    const safePhotos = useMemo(() => 
        Array.isArray(photos) ? photos : [], 
        [photos]
    );

    const recentPhotos = useMemo(() => 
        safePhotos.slice(0, 4),
        [safePhotos]
    );

    if (isLoading && safePhotos.length === 0) {
        return (
            <div className={`${styles.photoHome} ${mobile.photoHome}`}>
                <LoadingState />
            </div>
        );
    }

    if (error && safePhotos.length === 0) {
        let errorTitle = "Ошибка загрузки фотографий";
        let errorMessage = error;
        
        if (error.includes("404")) {
            errorTitle = "Фотографии не найдены";
            errorMessage = "Раздел фотографий временно недоступен. Пожалуйста, попробуйте позже.";
        } else if (error.includes("network") || error.includes("fetch")) {
            errorTitle = "Проблема с соединением";
            errorMessage = "Не удается загрузить фотографии. Проверьте подключение к интернету.";
        } else if (error.includes("timeout")) {
            errorTitle = "Превышено время ожидания";
            errorMessage = "Сервер долго не отвечает. Пожалуйста, попробуйте позже.";
        }
        
        return (
            <div className={`${styles.photoHome} ${mobile.photoHome}`}>
                <ErrorState 
                    error={errorMessage}
                    onRetry={() => {
                        hasLoadedRef.current = false;
                        loadPhotos();
                    }}
                    title={errorTitle}
                    variant="compact"
                />
            </div>
        );
    }

    if (recentPhotos.length === 0 && !isLoading && hasLoadedRef.current) {
        return (
            <div className={`${styles.photoHome} ${mobile.photoHome}`}>
                <div className={styles.emptyContainer}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                        <path d="M21 15l-5-4-3 3-4-4-5 5" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <p>Фотографий пока нет</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.photoHome} ${mobile.photoHome}`}>
            {recentPhotos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
            ))}
        </div>
    );
};