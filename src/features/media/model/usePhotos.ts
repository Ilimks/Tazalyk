// src/features/media/model/usePhotos.ts
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchPhotos } from '@/entities/media';

export const usePhotos = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { 
        items: photos, 
        status, 
        error, 
        totalPages, 
        currentPage,
        totalCount 
    } = useSelector((state: RootState) => state.photos);
    
    const isLoading = status === 'loading';
    
    const loadPhotos = useCallback(async (page: number = 1, pageSize: number = 12) => {
        console.log('📸 loadPhotos called:', { page, pageSize });
        const result = await dispatch(fetchPhotos({ page, pageSize })).unwrap();
        console.log('📸 loadPhotos result:', result);
        return result;
    }, [dispatch]);
    
    // Отладка
    console.log('📸 usePhotos state:', { 
        photosCount: photos.length, 
        totalPages, 
        currentPage, 
        totalCount,
        status 
    });
    
    return {
        photos,
        isLoading,
        error,
        loadPhotos,
        totalPages,
        currentPage,
        totalCount
    };
};