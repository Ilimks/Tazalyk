import { useState, useEffect } from 'react';
import { procurementsApi } from '@/shared/api';
import { ProcurementItem } from '@/entities/procurement/model/types';
import { formatProcurementData, sortProcurementsByDate } from '@/entities/procurement/lib/helpers';

export const useProcurement = () => {
    const [procurementData, setProcurementData] = useState<ProcurementItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProcurementData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await procurementsApi.getAll(1, 100);
            const formattedData = response.items.map(formatProcurementData);
            const sortedData = sortProcurementsByDate(formattedData);
            
            setProcurementData(sortedData);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            setError('Не удалось загрузить данные о закупках');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProcurementData();
    }, []);

    return {
        procurementData,
        loading,
        error,
        refetch: fetchProcurementData
    };
};