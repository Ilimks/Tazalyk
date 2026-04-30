'use client';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { fetchLocalActs, fetchLegislation } from '@/entities/document/model/documentSlice';

export const useDocuments = () => {
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((state) => state.documents);

    const fetchLocalActsData = useCallback(() => {
        dispatch(fetchLocalActs());
    }, [dispatch]);

    const fetchLegislationData = useCallback(() => {
        dispatch(fetchLegislation());
    }, [dispatch]);

    return {
        items,
        loading,
        error,
        fetchLocalActs: fetchLocalActsData,
        fetchLegislation: fetchLegislationData,
    };
};