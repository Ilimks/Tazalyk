import { baseApi } from '../baseApi';

export interface News {
    id: string;
    title: string;
    description: string;
    image?: string;
    date: string;
    created_at: string;
}

export const newsApi = {
    getAll: () => baseApi.get<News[]>('/news/'),
    getById: (id: string) => baseApi.get<News>(`/news/${id}/`),
    create: (data: Omit<News, 'id' | 'created_at'>) => 
        baseApi.post<News>('/news/', data),
    update: (id: string, data: Partial<News>) => 
        baseApi.put<News>(`/news/${id}/`, data),
    delete: (id: string) => 
        baseApi.delete<void>(`/news/${id}/`),
};