'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Images, Video as VideoIcon } from 'lucide-react';
import { MediaHeader } from '@/shared/ui/MediaHeader';
import { Tabs } from '@/shared/ui/Tabs';
import { Pagination } from '@/shared/ui/Pagination';
import { ErrorState } from '@/shared/ui/ErrorState';
import { EmptyState } from '@/shared/ui/EmptyState';
import { PhotoModal } from '@/shared/ui/Modals/PhotoModal';
import { VideoModal } from '@/shared/ui/Modals/VideoModal';
import type { PageResult } from '@/shared/api';
import { Photo, Video, MediaType } from '@/entities/media/model/types';
import { PhotoCard } from '@/shared/ui/Cards/PhotoCard';
import { VideoCard } from '@/shared/ui/Cards/VideoCard';
import styles from './MediaGallery.module.scss';
import mobile from './MediaGalleryMobile.module.scss';
import { LoadingState } from '@/shared/ui/LoadingState';
import { usePhotos } from '@/features/media/model/usePhotos';
import { useVideos } from '@/features/media/model/useVideos';

interface MediaGalleryProps {
    itemsPerPage?: number;
    defaultTab?: MediaType;
    // первые страницы фото и видео, загруженные на сервере; null — загружаем в браузере
    initialPhotos?: PageResult<Photo> | null;
    initialVideos?: PageResult<Video> | null;
}

const tabs = [
    { id: 'photos' as const, icon: <Images size={20} aria-hidden /> },
    { id: 'videos' as const, icon: <VideoIcon size={20} aria-hidden /> },
];

export const MediaGallery: React.FC<MediaGalleryProps> = ({
    itemsPerPage = 12,
    defaultTab = 'photos',
    initialPhotos = null,
    initialVideos = null,
}) => {
    const t = useTranslations('MediaGallery');
    const [activeTab, setActiveTab] = useState<MediaType>(defaultTab);
    const [currentPage, setCurrentPage] = useState(1);

    const {
        photos: loadedPhotos,
        isLoading: photosLoading,
        isSuccess: photosLoaded,
        error: photosError,
        loadPhotos,
        totalPages: photosTotalPages,
        totalCount: photosTotalCount
    } = usePhotos();

    const {
        videos: loadedVideos,
        isLoading: videosLoading,
        isSuccess: videosLoaded,
        error: videosError,
        loadVideos,
        totalPages: videosTotalPages,
        totalCount: videosTotalCount
    } = useVideos();

    // Пока пользователь не уходил с первой страницы вкладки, показываем данные с сервера без повторного запроса
    const [usingInitialPhotos, setUsingInitialPhotos] = useState(initialPhotos !== null);
    const [usingInitialVideos, setUsingInitialVideos] = useState(initialVideos !== null);
    const serverPhotos = usingInitialPhotos ? initialPhotos : null;
    const serverVideos = usingInitialVideos ? initialVideos : null;

    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    useEffect(() => {
        if (activeTab === 'photos') {
            if (usingInitialPhotos) {
                if (currentPage === 1) return;
                setUsingInitialPhotos(false);
            }
            loadPhotos(currentPage, itemsPerPage);
        } else {
            if (usingInitialVideos) {
                if (currentPage === 1) return;
                setUsingInitialVideos(false);
            }
            loadVideos(currentPage, itemsPerPage);
        }
        // usingInitialPhotos и usingInitialVideos меняются только внутри этого эффекта
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, currentPage, itemsPerPage, loadPhotos, loadVideos]);

    const photos = serverPhotos ? serverPhotos.items : loadedPhotos;
    const videos = serverVideos ? serverVideos.items : loadedVideos;
    const photosCount = serverPhotos ? serverPhotos.totalCount : photosTotalCount;
    const videosCount = serverVideos ? serverVideos.totalCount : videosTotalCount;

    // до первого ответа в браузере показываем загрузку, а не «материалов нет»
    const photosPending = !serverPhotos && (photosLoading || (!photosLoaded && !photosError));
    const videosPending = !serverVideos && (videosLoading || (!videosLoaded && !videosError));

    const currentData = activeTab === 'photos' ? photos : videos;
    const isLoading = activeTab === 'photos' ? photosPending : videosPending;
    const error = activeTab === 'photos'
        ? (serverPhotos ? null : photosError)
        : (serverVideos ? null : videosError);
    const totalPages = activeTab === 'photos'
        ? (serverPhotos ? serverPhotos.totalPages : photosTotalPages)
        : (serverVideos ? serverVideos.totalPages : videosTotalPages);
    const totalCount = activeTab === 'photos' ? photosCount : videosCount;

    // страница сбрасывается вместе со сменой вкладки, чтобы не запрашивать чужую страницу новой вкладки
    const handleTabChange = useCallback((tabId: string) => {
        if (tabId === activeTab) return;
        setActiveTab(tabId as MediaType);
        setCurrentPage(1);
    }, [activeTab]);

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
    }, [activeTab, currentPage, itemsPerPage, loadPhotos, loadVideos]);

    const updateTabCounts = tabs.map(tab => ({
        ...tab,
        label: t(tab.id),
        count: tab.id === 'photos' ? photosCount : videosCount
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
                    title={t('loadError')}
                    variant="compact"
                />
            );
        }

        if (currentData.length === 0 && !isLoading) {
            const variant = activeTab === 'photos' ? 'photo' : 'video';
            return <EmptyState variant={variant} />;
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
                    title={t('title')}
                    description={t('description')}
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
                    poster={selectedVideo.thumbnail}
                    galleryVideos={selectedVideo.gallery_videos}
                />
            )}
        </div>
    );
};
