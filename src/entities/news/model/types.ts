import type { PaginatedResponse } from '@/shared/api';

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

export type PaginatedNewsResponse = PaginatedResponse<News>;
