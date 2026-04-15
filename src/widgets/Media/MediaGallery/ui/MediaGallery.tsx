'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { MediaHeader } from '@/shared/ui/MediaHeader';
import { Tabs } from '@/shared/ui/Tabs';
import { Pagination } from '@/shared/ui/Pagination';
import { ErrorState } from '@/shared/ui/ErrorState';
import { PhotoModal } from '@/features/media/modal/PhotoModal';
import { VideoModal } from '@/features/media/modal/VideoModal';
import { Photo, Video, MediaType } from '@/entities/media/model/types';
import { PhotoCard } from '@/widgets/PhotoCard/ui/PhotoCard';
import { VideoCard } from '@/widgets/VideosCard/ui/VideosCard';
import styles from './MediaGallery.module.scss';
import mobile from './MediaGalleryMobile.module.scss';
import { LoadingState } from '@/shared/ui/LoadingState';
import { usePhotos } from '@/features/media/model/usePhotos';
import { useVideos } from '@/features/media/model/useVideos';

interface MediaGalleryProps {
    itemsPerPage?: number;
    defaultTab?: MediaType;
}

const tabs = [
    {
        id: 'photos' as const,
        label: 'Фотографии',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                <path d="M21 15l-5-4-3 3-4-4-5 5" stroke="currentColor" strokeWidth="2"/>
            </svg>
        )
    },
    {
        id: 'videos' as const,
        label: 'Видео',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                <polygon points="10 8 16 12 10 16" fill="currentColor"/>
            </svg>
        )
    }
];

export const MediaGallery: React.FC<MediaGalleryProps> = ({ 
    itemsPerPage = 12,
    defaultTab = 'photos'
}) => {
    const [activeTab, setActiveTab] = useState<MediaType>(defaultTab);
    const [currentPage, setCurrentPage] = useState(1);

    // Используем Redux хуки
    const { photos, isLoading: photosLoading, error: photosError, loadPhotos } = usePhotos();
    const { videos, isLoading: videosLoading, error: videosError, loadVideos } = useVideos();

    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    // Загружаем данные при монтировании
    useEffect(() => {
        if (photos.length === 0 && !photosLoading) {
            loadPhotos();
        }
        if (videos.length === 0 && !videosLoading) {
            loadVideos();
        }
    }, [loadPhotos, loadVideos, photos.length, videos.length, photosLoading, videosLoading]);

    // Сбрасываем страницу при смене вкладки
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    // Определяем текущие данные в зависимости от активной вкладки
    const currentData = activeTab === 'photos' ? photos : videos;
    const isLoading = activeTab === 'photos' ? photosLoading : videosLoading;
    const error = activeTab === 'photos' ? photosError : videosError;

    // Пагинация
    const totalPages = Math.max(1, Math.ceil(currentData.length / itemsPerPage));
    const validPage = Math.min(currentPage, totalPages);
    
    // Синхронизируем currentPage если он выходит за пределы
    useEffect(() => {
        if (currentPage !== validPage && validPage !== currentPage) {
            setCurrentPage(validPage);
        }
    }, [currentPage, validPage]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItemsOnPage = currentData.slice(startIndex, endIndex);

    const handleTabChange = useCallback((tabId: string) => {
        setActiveTab(tabId as MediaType);
    }, []);

    const goToPage = useCallback((page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const refetch = useCallback(() => {
        if (activeTab === 'photos') {
            loadPhotos();
        } else {
            loadVideos();
        }
    }, [activeTab, loadPhotos, loadVideos]);

    const handlePhotoClick = useCallback((photo: Photo) => {
        setSelectedPhoto(photo);
    }, []);

    const handleVideoClick = useCallback((video: Video) => {
        setSelectedVideo(video);
    }, []);

    const updateTabCounts = tabs.map(tab => ({
        ...tab,
        count: tab.id === 'photos' ? photos.length : videos.length
    }));

    const renderContent = () => {
        if (isLoading && currentData.length === 0) {
            return <LoadingState />;
        }
        
        if (error && currentData.length === 0) {
            return (
                <ErrorState 
                    error={error} 
                    onRetry={refetch}
                    title="Ошибка загрузки медиа"
                    variant="compact"
                />
            );
        }

        if (activeTab === 'photos') {
            return (
                <>
                    <div className={styles.grid}>
                        {(currentItemsOnPage as Photo[]).map((photo) => (
                            <PhotoCard 
                                key={photo.id} 
                                photo={photo}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={goToPage}
                            totalItems={currentData.length}
                            currentItemsCount={currentItemsOnPage.length}
                        />
                    )}
                </>
            );
        } else {
            return (
                <>
                    <div className={styles.grid}>
                        {(currentItemsOnPage as Video[]).map((video) => (
                            <VideoCard 
                                key={video.id} 
                                video={video}
                            />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={goToPage}
                            totalItems={currentData.length}
                            currentItemsCount={currentItemsOnPage.length}
                        />
                    )}
                </>
            );
        }
    };

    return (
        <div className={`${styles.gallery} ${mobile.gallery}`}>
            <div className="container">
                <MediaHeader
                    title="Медиа галерея"
                    description="Фотографии и видео с мероприятий, экологических акций и трудовых будней предприятия"
                />

                <Tabs
                    tabs={updateTabCounts}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />

                {renderContent()}
            </div>

            {selectedPhoto && (
                <PhotoModal
                    isOpen={!!selectedPhoto}
                    onClose={() => setSelectedPhoto(null)}
                    images={[selectedPhoto.main_image, ...(selectedPhoto.gallery_images || [])]}
                    date={selectedPhoto.date}
                />
            )}

            {selectedVideo && (
                <VideoModal
                    isOpen={!!selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                    videoUrl={selectedVideo.main_video_url}
                    galleryVideos={selectedVideo.gallery_videos}
                />
            )}
        </div>
    );
};