// src/shared/api/endpoints/videos.ts
import { baseApi } from '../baseApi';

export interface Video {
    id: string;
    main_video_url: string;
    gallery_videos: string[];
    thumbnail?: string;
    date: string;
    created_at: string;
}

interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export const videosApi = {
    getAll: async (page: number = 1, pageSize: number = 12) => {
        const response = await baseApi.get<PaginatedResponse<Video>>('/videos/', {
            page: page,
            page_size: pageSize
        });
        
        console.log('🎬 Videos API response:', {
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
    getById: (id: string) => baseApi.get<Video>(`/videos/${id}/`),
};