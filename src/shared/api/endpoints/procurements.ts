import { baseApi } from '../baseApi';

export interface Procurement {
    id: string;
    number: string;
    contractNumber: string;
    supplier: string;
    type: 'goods' | 'services' | 'works';
    method: 'direct' | 'quotation' | 'simple' | 'tender';
    status: 'active' | 'completed' | 'cancelled';
    date: string;
    amount: number;
    created_at: string;
}

interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export const procurementsApi = {
    getAll: async (page: number = 1, pageSize: number = 10) => {
        const response = await baseApi.get<PaginatedResponse<Procurement>>('/procurements/', {
            page: page,
            page_size: pageSize
        });
        
        return {
            items: response.results || [],
            totalCount: response.count,
            totalPages: Math.ceil(response.count / pageSize),
            currentPage: page
        };
    },
    getById: (id: string) => baseApi.get<Procurement>(`/procurements/${id}/`),
};