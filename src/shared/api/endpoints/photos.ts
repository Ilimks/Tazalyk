// src/shared/api/endpoints/photos.ts
import { baseApi } from '../baseApi';

export interface Photo {
    id: string;
    main_image: string;
    gallery_images: string[];
    date: string;
    created_at: string;
}

interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export const photosApi = {
    getAll: async (page: number = 1, pageSize: number = 12) => {
        const response = await baseApi.get<PaginatedResponse<Photo>>('/photos/', {
            page: page,
            page_size: pageSize
        });
        
        console.log('📸 Photos API response:', {
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
    getById: (id: string) => baseApi.get<Photo>(`/photos/${id}/`),
};