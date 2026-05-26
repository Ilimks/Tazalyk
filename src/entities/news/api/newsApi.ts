import { baseApi } from "@/shared/api";

export interface News {
    id: string;
    title_ru: string;
    description_ru: string;
    title_ky?: string;
    description_ky?: string;
    image?: string;
    date: string;
    created_at: string;
}

export interface NewsFilters {
    page?: number;
    page_size?: number;
    search?: string;
    year?: string;
}

export interface PaginatedNewsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: News[];
}

export const newsApi = {
    getAll: async (filters: NewsFilters = {}): Promise<PaginatedNewsResponse> => {
        const params: Record<string, any> = {};
        if (filters.page) params.page = filters.page;
        if (filters.page_size) params.page_size = filters.page_size;
        if (filters.search) params.search = filters.search;
        if (filters.year && filters.year !== 'all') params.year = filters.year;
        
        const response = await baseApi.get<PaginatedNewsResponse>('/news/', params);
        return response;
    },
    getById: async (id: string): Promise<News> => {
        return await baseApi.get<News>(`/news/${id}/`);
    },
};

export const fetchNewsById = async (id: string): Promise<News> => {
    return await newsApi.getById(id);
};