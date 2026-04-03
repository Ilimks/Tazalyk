import { useState, useEffect } from 'react';
import { api } from '@/shared/api/api';
import { Photo, Video, MediaType } from '../../../../entities/media/model/types';

const ITEMS_PER_PAGE = 12;

export const useMediaGallery = () => {
    const [activeTab, setActiveTab] = useState<MediaType>('photos');
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const loadMedia = async () => {
        try {
            setLoading(true);
            const [photosData, videosData] = await Promise.all([
                api.getPhotos(),
                api.getVideos()
            ]);

            const sortedPhotos = [...photosData].sort((a, b) => {
                const dateA = new Date(a.date || a.created_at).getTime();
                const dateB = new Date(b.date || b.created_at).getTime();
                return dateB - dateA;
            });

            const sortedVideos = [...videosData].sort((a, b) => {
                const dateA = new Date(a.date || a.created_at).getTime();
                const dateB = new Date(b.date || b.created_at).getTime();
                return dateB - dateA;
            });

            setPhotos(sortedPhotos);
            setVideos(sortedVideos);
            setError(null);
        } catch (err) {
            console.error('Error loading media:', err);
            setError('Не удалось загрузить медиафайлы');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMedia();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    const currentItems = activeTab === 'photos' ? photos : videos;
    const totalPages = Math.ceil(currentItems.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItemsOnPage = currentItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return {
        activeTab,
        setActiveTab,
        photos,
        videos,
        loading,
        error,
        currentItemsOnPage,
        currentPage,
        totalPages,
        totalItems: currentItems.length,
        currentItemsCount: currentItemsOnPage.length,
        goToPage,
        refetch: loadMedia
    };
};