import { baseApi, getServerFetchOptions } from '@/shared/api';
import type { PaginatedVacanciesResponse, Vacancy } from '../model/types';

export const VACANCIES_REVALIDATE_SECONDS = 60;

const PAGE_SIZE = 50;

export const vacanciesApi = {
    getAll: (init?: RequestInit) =>
        baseApi.get<PaginatedVacanciesResponse>('/vacancies/', { page_size: PAGE_SIZE }, init),

    apply: (form: FormData) => baseApi.postForm<{ ok: boolean }>('/vacancy-applications/', form),
};

export const prefetchVacancies = async (): Promise<Vacancy[] | null> => {
    try {
        const response = await vacanciesApi.getAll(getServerFetchOptions(VACANCIES_REVALIDATE_SECONDS));
        return response.results;
    } catch (error) {
        console.error('Failed to prefetch vacancies:', error);
        return null;
    }
};
