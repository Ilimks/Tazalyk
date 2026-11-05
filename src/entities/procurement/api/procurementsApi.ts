import { baseApi, toPageResult, PaginatedResponse } from '@/shared/api';
import { ProcurementItem } from '../model/types';

export const procurementsApi = {
    getAll: async (page: number = 1, pageSize: number = 10, init?: RequestInit) => {
        const response = await baseApi.get<PaginatedResponse<ProcurementItem>>('/procurements/', {
            page,
            page_size: pageSize,
        }, init);
        return toPageResult(response, page, pageSize);
    },
    getById: (id: string) => baseApi.get<ProcurementItem>(`/procurements/${id}/`),
};
