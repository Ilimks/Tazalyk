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
    const { 
        photos, 
        isLoading: photosLoading, 
        error: photosError, 
        loadPhotos,
        totalPages: photosTotalPages,
        totalCount: photosTotalCount
    } = usePhotos();
    
    const { 
        videos, 
        isLoading: videosLoading, 
        error: videosError, 
        loadVideos,
        totalPages: videosTotalPages,
        totalCount: videosTotalCount
    } = useVideos();

    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    // Загружаем данные при смене страницы или вкладки
    useEffect(() => {
        if (activeTab === 'photos') {
            loadPhotos(currentPage, itemsPerPage);
        } else {
            loadVideos(currentPage, itemsPerPage);
        }
    }, [activeTab, currentPage, loadPhotos, loadVideos, itemsPerPage]);

    // Сбрасываем страницу при смене вкладки
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    // Определяем текущие данные в зависимости от активной вкладки
    const currentData = activeTab === 'photos' ? photos : videos;
    const isLoading = activeTab === 'photos' ? photosLoading : videosLoading;
    const error = activeTab === 'photos' ? photosError : videosError;
    const totalPages = activeTab === 'photos' ? photosTotalPages : videosTotalPages;
    const totalCount = activeTab === 'photos' ? photosTotalCount : videosTotalCount;

    const handleTabChange = useCallback((tabId: string) => {
        setActiveTab(tabId as MediaType);
    }, []);

    const goToPage = useCallback((page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const refetch = useCallback(() => {
        if (activeTab === 'photos') {
            loadPhotos(currentPage, itemsPerPage);
        } else {
            loadVideos(currentPage, itemsPerPage);
        }
    }, [activeTab, loadPhotos, loadVideos, currentPage, itemsPerPage]);

    const handlePhotoClick = useCallback((photo: Photo) => {
        setSelectedPhoto(photo);
    }, []);

    const handleVideoClick = useCallback((video: Video) => {
        setSelectedVideo(video);
    }, []);

    const updateTabCounts = tabs.map(tab => ({
        ...tab,
        count: totalCount || (tab.id === 'photos' ? photos.length : videos.length)
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

        return (
            <>
                <div className={styles.grid}>
                    {currentData.map((item) => (
                        activeTab === 'photos' ? (
                            <PhotoCard 
                                key={item.id} 
                                photo={item as Photo}
                            />
                        ) : (
                            <VideoCard 
                                key={item.id} 
                                video={item as Video}
                            />
                        )
                    ))}
                </div>
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goToPage}
                        totalItems={totalCount}
                        currentItemsCount={currentData.length}
                    />
                )}
            </>
        );
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