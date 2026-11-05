import { baseApi, getServerFetchOptions as getSharedServerFetchOptions } from '@/shared/api';
import { News, NewsFilters, PaginatedNewsResponse } from '../model/types';

// Как часто сервер обновляет кэш новостей, секунд
export const NEWS_REVALIDATE_SECONDS = 60;

// Опции серверной загрузки новостей (общий хелпер из shared/api с кэшем новостей)
export const getServerFetchOptions = (): RequestInit =>
    getSharedServerFetchOptions(NEWS_REVALIDATE_SECONDS);

export const newsApi = {
    getAll: (filters: NewsFilters = {}, init?: RequestInit) =>
        baseApi.get<PaginatedNewsResponse>('/news/', {
            page: filters.page || undefined,
            page_size: filters.page_size || undefined,
            search: filters.search || undefined,
            year: filters.year && filters.year !== 'all' ? filters.year : undefined,
        }, init),

    getById: (id: string, init?: RequestInit) =>
        baseApi.get<News>(`/news/${encodeURIComponent(id)}/`, undefined, init),
};
