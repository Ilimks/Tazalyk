// hooks/useProcurement.ts
import { useState, useEffect } from 'react';
import { api } from '@/shared/api/api';
import { ProcurementItem } from '@/entities/procurement/model/types';

export const useProcurement = () => {
    const [procurementData, setProcurementData] = useState<ProcurementItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProcurementData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const data = await api.getProcurements();
            
            const formattedData: ProcurementItem[] = data.map((item: any) => ({
                id: item.id,
                contractNumber: item.contractNumber,
                supplier: item.supplier,
                type: item.type || 'goods',
                method: item.method || 'direct',
                status: item.status,
                date: new Date(item.date).toLocaleDateString('ru-RU'),
                amount: typeof item.amount === 'string' ? parseFloat(item.amount) : item.amount,
                created_at: item.created_at
            }));
            
            const sortedData = [...formattedData].sort((a, b) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });
            
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