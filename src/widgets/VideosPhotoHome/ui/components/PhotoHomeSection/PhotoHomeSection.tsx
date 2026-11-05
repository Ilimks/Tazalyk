'use client'
import { useEffect, useRef, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { PhotoCard } from '@/shared/ui/Cards/PhotoCard/PhotoCard';
import { ErrorState } from '@/shared/ui/ErrorState';
import { EmptyState } from '@/shared/ui/EmptyState'
import styles from './PhotoHomeSection.module.scss';
import mobile from './PhotoHomeSectionMobile.module.scss';
import { LoadingState } from '@/shared/ui/LoadingState';
import { usePhotos } from '@/features/media/model/usePhotos';

export const PhotoHomeSection: React.FC = () => {
    const t = useTranslations('LoadErrors');
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
        let errorTitle = t('photos.title');
        let errorMessage = error;

        if (error.includes("404")) {
            errorTitle = t('photos.notFoundTitle');
            errorMessage = t('photos.notFoundMessage');
        } else if (error.includes("network") || error.includes("fetch")) {
            errorTitle = t('connectionTitle');
            errorMessage = t('photos.connectionMessage');
        } else if (error.includes("timeout")) {
            errorTitle = t('timeoutTitle');
            errorMessage = t('timeoutMessage');
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
                <EmptyState variant="photo" />
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