'use client';
import React, { useState } from 'react';
import { MediaHeader } from '@/shared/ui/MediaHeader';
import { Tabs } from '@/shared/ui/Tabs';
import { Pagination } from '@/shared/ui/Pagination';
import { useMediaGallery } from '../model/useMediaGallery';
import { LoadingState } from './components/LoadingState/LoadingState';
import { ErrorState } from './components/ErrorState/ErrorState';
import { PhotoModal } from '@/features/media/modal/PhotoModal';
import { VideoModal } from '@/features/media/modal/VideoModal';
import { Photo, Video, MediaType } from '@/entities/media/model/types';
import { PhotoCard } from '@/entities/media/ui/PhotoCard';
import { VideoCard } from '@/entities/media/ui/VideoCard';
import styles from './MediaGallery.module.scss';
import mobile from './MediaGalleryMobile.module.scss';

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

export const MediaGallery: React.FC = () => {
    const {
        activeTab,
        setActiveTab,
        photos,
        videos,
        loading,
        error,
        currentItemsOnPage,
        currentPage,
        totalPages,
        totalItems,
        currentItemsCount,
        goToPage,
        refetch
    } = useMediaGallery();

    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    const updateTabCounts = tabs.map(tab => ({
        ...tab,
        count: tab.id === 'photos' ? photos.length : videos.length
    }));

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId as MediaType);
    };

    const renderContent = () => {
        if (loading) return <LoadingState />;
        if (error) return <ErrorState error={error} onRetry={refetch} />;

        if (activeTab === 'photos') {
            return (
                <>
                    <div className={styles.grid}>
                        {(currentItemsOnPage as Photo[]).map((photo) => (
                            <PhotoCard 
                                key={photo.id} 
                                photo={photo} 
                                onClick={() => setSelectedPhoto(photo)}
                            />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goToPage}
                        totalItems={totalItems}
                        currentItemsCount={currentItemsCount}
                    />
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
                                onClick={() => setSelectedVideo(video)}
                            />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goToPage}
                        totalItems={totalItems}
                        currentItemsCount={currentItemsCount}
                    />
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
                    title={selectedPhoto.title}
                    description={selectedPhoto.description}
                    date={selectedPhoto.date}
                />
            )}

            {selectedVideo && (
                <VideoModal
                    isOpen={!!selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                    videoUrl={selectedVideo.main_video_url}
                    title={selectedVideo.title}
                    galleryVideos={selectedVideo.gallery_videos}
                />
            )}
        </div>
    );
};