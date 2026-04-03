import { ProcurementItem } from '../model/types';

export const formatProcurementData = (item: any): ProcurementItem => ({
    id: item.id,
    contractNumber: item.contractNumber,
    supplier: item.supplier,
    type: item.type || 'goods',
    method: item.method || 'direct',
    status: item.status,
    date: new Date(item.date).toLocaleDateString('ru-RU'),
    amount: typeof item.amount === 'string' ? parseFloat(item.amount) : item.amount,
    created_at: item.created_at
});

export const sortProcurementsByDate = (items: ProcurementItem[]): ProcurementItem[] => {
    return [...items].sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
};


export const isContentArray = (content: string | string[]): content is string[] => {
    return Array.isArray(content);
};