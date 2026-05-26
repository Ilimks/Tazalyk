'use client';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { fetchNews, fetchNewsById, clearCurrentNews, clearError, setPage } from '@/entities/news';
import { NewsFilters } from '@/entities/news/api/newsApi';

export const useNews = () => {
    const dispatch = useAppDispatch();
    const { items, totalCount, currentPage, pageSize, currentNews, status, error } = useAppSelector((state) => state.news);
    
    const isLoading = status === 'loading';
    const isSuccess = status === 'succeeded';
    const isError = status === 'failed';
    
    const loadNews = useCallback((filters: NewsFilters = {}) => {
        dispatch(fetchNews({ page: currentPage, page_size: pageSize, ...filters }));
    }, [dispatch, currentPage, pageSize]);
    
    const loadNewsById = useCallback((id: string) => {
        dispatch(fetchNewsById(id));
    }, [dispatch]);
    
    const changePage = useCallback((page: number) => {
        dispatch(setPage(page));
    }, [dispatch]);
    
    const clearCurrent = useCallback(() => {
        dispatch(clearCurrentNews());
    }, [dispatch]);
    
    const resetError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);
    
    return {
        news: items,
        totalCount,
        currentPage,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
        currentNews,
        isLoading,
        isSuccess,
        isError,
        error,
        loadNews,
        loadNewsById,
        changePage,
        clearCurrent,
        resetError,
    };
};