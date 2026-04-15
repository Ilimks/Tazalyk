'use client';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { 
    fetchVideos, 
    fetchVideoById, 
    createVideo, 
    updateVideo, 
    deleteVideo,
    clearCurrentVideo,
    clearError
} from '../../../entities/media/model/videoSlice';
import { Video } from '../../../entities/media/model/types';

export const useVideos = () => {
    const dispatch = useAppDispatch();
    const { items, currentVideo, status, error } = useAppSelector((state) => state.videos);

    const isLoading = status === 'loading';
    const isSuccess = status === 'succeeded';
    const isError = status === 'failed';

    const loadVideos = useCallback(() => {
        dispatch(fetchVideos());
    }, [dispatch]);

    const loadVideoById = useCallback((id: string) => {
        dispatch(fetchVideoById(id));
    }, [dispatch]);

    const addVideo = useCallback((data: Omit<Video, 'id' | 'created_at' | 'updated_at'>) => {
        return dispatch(createVideo(data)).unwrap();
    }, [dispatch]);

    const editVideo = useCallback((id: string, data: Partial<Video>) => {
        return dispatch(updateVideo({ id, data })).unwrap();
    }, [dispatch]);

    const removeVideo = useCallback((id: string) => {
        return dispatch(deleteVideo(id)).unwrap();
    }, [dispatch]);

    const clearCurrent = useCallback(() => {
        dispatch(clearCurrentVideo());
    }, [dispatch]);

    const resetError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    return {
        videos: items,
        currentVideo,
        isLoading,
        isSuccess,
        isError,
        error,
        loadVideos,
        loadVideoById,
        addVideo,
        editVideo,
        removeVideo,
        clearCurrent,
        resetError,
    };
};