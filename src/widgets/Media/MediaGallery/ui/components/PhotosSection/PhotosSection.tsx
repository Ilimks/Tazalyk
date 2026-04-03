import React from 'react';
import { Photo } from '../../../../../../entities/media/model/types';
import { PhotoCard } from '../../../../../../entities/media/ui/PhotoCard/PhotoCard';
import { EmptyState } from '@/shared/ui/EmptyState';
import styles from './PhotosSection.module.scss';

interface PhotosSectionProps {
    photos: Photo[];
    onPhotoClick: (photo: Photo) => void;
}

export const PhotosSection: React.FC<PhotosSectionProps> = ({ photos, onPhotoClick }) => {
    if (photos.length === 0) {
        return (
            <EmptyState
                title="Фотографий пока нет"
                description="Следите за обновлениями, скоро появятся новые фото"
                icon={
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                        <path d="M21 15l-5-4-3 3-4-4-5 5" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                }
            />
        );
    }

    return (
        <div className={styles.photosGrid}>
            {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} onClick={() => onPhotoClick(photo)} />
            ))}
        </div>
    );
};