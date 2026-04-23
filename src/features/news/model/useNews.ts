'use client';
import { useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { 
    fetchNews, 
    fetchLatestNewsThunk,
    fetchNewsByIdThunk,
    clearCurrentNews,
    clearError
} from '@/entities/news';

export const useNews = () => {
    const dispatch = useAppDispatch();
    const { items, currentNews, status, error } = useAppSelector((state) => state.news);
    const isLoadingRef = useRef(false);

    const isLoading = status === 'loading';
    const isSuccess = status === 'succeeded';
    const isError = status === 'failed';

    // Загрузка всех новостей с пагинацией
    const loadNews = useCallback((page: number = 1, pageSize: number = 12) => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        dispatch(fetchNews({ page, pageSize })).finally(() => {
            isLoadingRef.current = false;
        });
    }, [dispatch]);

    // Загрузка последних новостей для главной страницы
    const loadLatestNews = useCallback((limit: number = 4) => {
        console.log('loadLatestNews called with limit:', limit);
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        dispatch(fetchLatestNewsThunk(limit)).finally(() => {
            isLoadingRef.current = false;
        });
    }, [dispatch]);

    const loadNewsById = useCallback((id: string) => {
        dispatch(fetchNewsByIdThunk(id));
    }, [dispatch]);

    const clearCurrent = useCallback(() => {
        dispatch(clearCurrentNews());
    }, [dispatch]);

    const resetError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    return {
        news: items || [],
        currentNews,
        isLoading,
        isSuccess,
        isError,
        error,
        loadNews,
        loadLatestNews,
        loadNewsById,
        clearCurrent,
        resetError,
    };
};