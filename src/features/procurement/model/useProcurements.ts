'use client';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { 
    fetchProcurements, 
    fetchProcurementById, 
    clearError
} from '@/entities/procurement/model/procurementSlice';

export const useProcurements = () => {
    const dispatch = useAppDispatch();
    const { 
        items, 
        status, 
        error, 
        totalPages, 
        currentPage, 
        totalCount 
    } = useAppSelector((state) => state.procurements);

    const isLoading = status === 'loading';
    const isSuccess = status === 'succeeded';
    const isError = status === 'failed';

    // Только загрузка данных
    const loadProcurements = useCallback((page: number = 1, pageSize: number = 10) => {
        dispatch(fetchProcurements({ page, pageSize }));
    }, [dispatch]);

    const loadProcurementById = useCallback((id: string) => {
        dispatch(fetchProcurementById(id));
    }, [dispatch]);

    const resetError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    return {
        procurements: items,
        isLoading,
        isSuccess,
        isError,
        error,
        totalPages,
        currentPage,
        totalCount,
        loadProcurements,
        loadProcurementById,
        resetError,
    };
};