import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { fetchVideos } from '@/entities/media';

export const useVideos = () => {
    const dispatch = useAppDispatch();
    const {
        items: videos,
        status,
        error,
        totalPages,
        currentPage,
        totalCount
    } = useAppSelector((state) => state.videos);

    const isLoading = status === 'loading';
    const isSuccess = status === 'succeeded';

    const loadVideos = useCallback((page: number = 1, pageSize: number = 12) => {
        dispatch(fetchVideos({ page, pageSize }));
    }, [dispatch]);

    return {
        videos,
        isLoading,
        isSuccess,
        error,
        loadVideos,
        totalPages,
        currentPage,
        totalCount
    };
};
