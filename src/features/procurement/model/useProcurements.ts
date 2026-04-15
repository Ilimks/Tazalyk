'use client';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { 
    fetchProcurements, 
    fetchProcurementById, 
    createProcurement, 
    updateProcurement, 
    deleteProcurement,
    clearError
} from '@/entities/procurement/model/procurementSlice';
import { ProcurementItem } from '@/entities/procurement/model/types';

export const useProcurements = () => {
    const dispatch = useAppDispatch();
    const { items, status, error } = useAppSelector((state) => state.procurements);

    const isLoading = status === 'loading';
    const isSuccess = status === 'succeeded';
    const isError = status === 'failed';

    const loadProcurements = useCallback(() => {
        dispatch(fetchProcurements());
    }, [dispatch]);

    const loadProcurementById = useCallback((id: string) => {
        dispatch(fetchProcurementById(id));
    }, [dispatch]);

    const addProcurement = useCallback((data: Omit<ProcurementItem, 'id' | 'created_at' | 'updated_at'>) => {
        return dispatch(createProcurement(data)).unwrap();
    }, [dispatch]);

    const editProcurement = useCallback((id: string, data: Partial<ProcurementItem>) => {
        return dispatch(updateProcurement({ id, data })).unwrap();
    }, [dispatch]);

    const removeProcurement = useCallback((id: string) => {
        return dispatch(deleteProcurement(id)).unwrap();
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
        loadProcurements,
        loadProcurementById,
        addProcurement,
        editProcurement,
        removeProcurement,
        resetError,
    };
};