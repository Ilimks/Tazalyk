'use client';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { 
    fetchNews, 
    fetchNewsByIdThunk, 
    createNewsThunk, 
    updateNewsThunk, 
    deleteNewsThunk,
    clearCurrentNews,
    clearError,
    News 
} from '@/entities/news';

export const useNews = () => {
    const dispatch = useAppDispatch();
    const { items, currentNews, status, error } = useAppSelector((state) => state.news);

    const isLoading = status === 'loading';
    const isSuccess = status === 'succeeded';
    const isError = status === 'failed';

    const loadNews = useCallback(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    const loadNewsById = useCallback((id: string) => {
        dispatch(fetchNewsByIdThunk(id));
    }, [dispatch]);

    const addNews = useCallback((data: Omit<News, 'id' | 'created_at'>) => {
        return dispatch(createNewsThunk(data)).unwrap();
    }, [dispatch]);

    const editNews = useCallback((id: string, data: Partial<News>) => {
        return dispatch(updateNewsThunk({ id, data })).unwrap();
    }, [dispatch]);

    const removeNews = useCallback((id: string) => {
        return dispatch(deleteNewsThunk(id)).unwrap();
    }, [dispatch]);

    const clearCurrent = useCallback(() => {
        dispatch(clearCurrentNews());
    }, [dispatch]);

    const resetError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    return {
        news: items,
        currentNews,
        isLoading,
        isSuccess,
        isError,
        error,
        loadNews,
        loadNewsById,
        addNews,
        editNews,
        removeNews,
        clearCurrent,
        resetError,
    };
};