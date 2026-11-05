import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { fetchPhotos } from '@/entities/media';

export const usePhotos = () => {
    const dispatch = useAppDispatch();
    const {
        items: photos,
        status,
        error,
        totalPages,
        currentPage,
        totalCount
    } = useAppSelector((state) => state.photos);

    const isLoading = status === 'loading';
    const isSuccess = status === 'succeeded';

    // ошибка попадает в state.photos.error и показывается через ErrorState
    const loadPhotos = useCallback((page: number = 1, pageSize: number = 12) => {
        dispatch(fetchPhotos({ page, pageSize }));
    }, [dispatch]);

    return {
        photos,
        isLoading,
        isSuccess,
        error,
        loadPhotos,
        totalPages,
        currentPage,
        totalCount
    };
};
