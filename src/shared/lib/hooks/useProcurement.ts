// hooks/useProcurement.ts
import { useState, useEffect } from 'react';
import { procurementsApi } from '@/shared/api';
import { ProcurementItem } from '@/entities/procurement/model/types';

export const useProcurement = () => {
    const [procurementData, setProcurementData] = useState<ProcurementItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const fetchProcurementData = async (page: number = 1, pageSize: number = 12) => {
        try {
            setLoading(true);
            setError(null);
            
            // Используем procurementsApi.getAll с пагинацией
            const response = await procurementsApi.getAll(page, pageSize);
            
            const formattedData: ProcurementItem[] = response.items.map((item: any) => ({
                id: item.id,
                number: item.number || '', // Добавлено поле number
                contractNumber: item.contractNumber,
                supplier: item.supplier,
                type: item.type || 'goods',
                method: item.method || 'direct',
                status: item.status,
                date: new Date(item.date).toLocaleDateString('ru-RU'),
                amount: typeof item.amount === 'string' ? parseFloat(item.amount) : item.amount,
                created_at: item.created_at
            }));
            
            // Сортировка по дате (новые сверху)
            const sortedData = [...formattedData].sort((a, b) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });
            
            setProcurementData(sortedData);
            setTotalPages(response.totalPages);
            setTotalCount(response.totalCount);
            setCurrentPage(response.currentPage);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            setError('Не удалось загрузить данные о закупках');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProcurementData(1, 12);
    }, []);

    return {
        procurementData,
        loading,
        error,
        totalPages,
        totalCount,
        currentPage,
        refetch: fetchProcurementData
    };
};