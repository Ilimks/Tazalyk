import { baseApi, toPageResult, PaginatedResponse } from '@/shared/api';
import { Photo, Video } from '../model/types';

export const photosApi = {
    getAll: async (page: number = 1, pageSize: number = 12, init?: RequestInit) => {
        const response = await baseApi.get<PaginatedResponse<Photo>>('/photos/', {
            page,
            page_size: pageSize,
        }, init);
        return toPageResult(response, page, pageSize);
    },
    getById: (id: string) => baseApi.get<Photo>(`/photos/${id}/`),
};

export const videosApi = {
    getAll: async (page: number = 1, pageSize: number = 12, init?: RequestInit) => {
        const response = await baseApi.get<PaginatedResponse<Video>>('/videos/', {
            page,
            page_size: pageSize,
        }, init);
        return toPageResult(response, page, pageSize);
    },
    getById: (id: string) => baseApi.get<Video>(`/videos/${id}/`),
};
