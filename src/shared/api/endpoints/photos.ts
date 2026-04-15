import { baseApi } from '../baseApi';

export interface Photo {
    id: string;
    main_image: string;
    gallery_images: string[];
    date: string;
    created_at: string;
}

export const photosApi = {
    getAll: () => baseApi.get<Photo[]>('/photos/'),
    getById: (id: string) => baseApi.get<Photo>(`/photos/${id}/`),
    create: (data: Omit<Photo, 'id' | 'created_at'>) => 
        baseApi.post<Photo>('/photos/', data),
    update: (id: string, data: Partial<Photo>) => 
        baseApi.put<Photo>(`/photos/${id}/`, data),
    delete: (id: string) => 
        baseApi.delete<void>(`/photos/${id}/`),
};