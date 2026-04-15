'use client';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { 
    fetchPhotos, 
    fetchPhotoById, 
    createPhoto, 
    updatePhoto, 
    deletePhoto,
    clearCurrentPhoto,
    clearPhotoError,
    Photo
} from '../../../entities/media';

export const usePhotos = () => {
    const dispatch = useAppDispatch();
    const { items, currentPhoto, status, error } = useAppSelector((state) => state.photos);

    const isLoading = status === 'loading';
    const isSuccess = status === 'succeeded';
    const isError = status === 'failed';

    const loadPhotos = useCallback(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    const loadPhotoById = useCallback((id: string) => {
        dispatch(fetchPhotoById(id));
    }, [dispatch]);

    const addPhoto = useCallback((data: Omit<Photo, 'id' | 'created_at' | 'updated_at'>) => {
        return dispatch(createPhoto(data)).unwrap();
    }, [dispatch]);

    const editPhoto = useCallback((id: string, data: Partial<Photo>) => {
        return dispatch(updatePhoto({ id, data })).unwrap();
    }, [dispatch]);

    const removePhoto = useCallback((id: string) => {
        return dispatch(deletePhoto(id)).unwrap();
    }, [dispatch]);

    const clearCurrent = useCallback(() => {
        dispatch(clearCurrentPhoto());
    }, [dispatch]);

    const resetError = useCallback(() => {
        dispatch(clearPhotoError());  // <-- Используйте правильное имя
    }, [dispatch]);

    return {
        photos: items,
        currentPhoto,
        isLoading,
        isSuccess,
        isError,
        error,
        loadPhotos,
        loadPhotoById,
        addPhoto,
        editPhoto,
        removePhoto,
        clearCurrent,
        resetError,
    };
};