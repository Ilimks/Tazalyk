// src/features/media/model/useVideos.ts
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchVideos } from '@/entities/media';

export const useVideos = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { 
        items: videos, 
        status, 
        error, 
        totalPages, 
        currentPage,
        totalCount 
    } = useSelector((state: RootState) => state.videos);
    
    const isLoading = status === 'loading';
    
    const loadVideos = useCallback(async (page: number = 1, pageSize: number = 12) => {
        await dispatch(fetchVideos({ page, pageSize })).unwrap();
    }, [dispatch]);
    
    return {
        videos,
        isLoading,
        error,
        loadVideos,
        totalPages,
        currentPage,
        totalCount
    };
};