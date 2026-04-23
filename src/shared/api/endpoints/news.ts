import { baseApi } from '../baseApi';

export interface News {
    id: string;
    title: string;
    description: string;
    image?: string;
    date: string;
    created_at: string;
}

interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export const newsApi = {
    getAll: async (page: number = 1, pageSize: number = 12) => {
        const response = await baseApi.get<PaginatedResponse<News>>('/news/', {
            page: page,
            page_size: pageSize
        });
        
        console.log('📰 News API response:', {
            resultsCount: response.results?.length,
            totalCount: response.count,
            totalPages: Math.ceil(response.count / pageSize),
            currentPage: page
        });
        
        return {
            items: response.results || [],
            totalCount: response.count,
            totalPages: Math.ceil(response.count / pageSize),
            currentPage: page
        };
    },
    getById: (id: string) => baseApi.get<News>(`/news/${id}/`),
};