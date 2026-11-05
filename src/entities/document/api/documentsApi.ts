import { baseApi, PaginatedResponse } from '@/shared/api';
import { Document } from '../model/types';

const createDocumentsApi = (endpoint: string) => ({
    getAll: async (init?: RequestInit): Promise<Document[]> => {
        const response = await baseApi.get<PaginatedResponse<Document>>(endpoint, undefined, init);
        return response?.results || [];
    },
    getById: (id: string) => baseApi.get<Document>(`${endpoint}${id}/`),
});

export const legislationApi = createDocumentsApi('/legislation/');
export const localActsApi = createDocumentsApi('/local-acts/');
