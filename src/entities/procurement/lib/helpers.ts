import { ProcurementItem } from '../model/types';

export const sortProcurementsByDate = (items: ProcurementItem[]): ProcurementItem[] => {
    return [...items].sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
};


export const isContentArray = (content: string | string[]): content is string[] => {
    return Array.isArray(content);
};