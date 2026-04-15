import { baseApi } from '../baseApi';

export interface Video {
    id: string;
    main_video_url: string;
    gallery_videos: string[];
    thumbnail?: string;
    date: string;
    created_at: string;
}

export const videosApi = {
    getAll: () => baseApi.get<Video[]>('/videos/'),
    getById: (id: string) => baseApi.get<Video>(`/videos/${id}/`),
    create: (data: Omit<Video, 'id' | 'created_at'>) => 
        baseApi.post<Video>('/videos/', data),
    update: (id: string, data: Partial<Video>) => 
        baseApi.put<Video>(`/videos/${id}/`, data),
    delete: (id: string) => 
        baseApi.delete<void>(`/videos/${id}/`),
};