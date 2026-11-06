import { baseApi, getServerFetchOptions } from '@/shared/api';
import type { PaginatedVacanciesResponse, Vacancy } from '../model/types';

// Как часто сервер обновляет кэш: включённая или отключённая в админке вакансия
// появится или пропадёт на сайте не позже чем через минуту
export const VACANCIES_REVALIDATE_SECONDS = 60;

// вакансий немного — все активные приходят одной страницей
const PAGE_SIZE = 50;

export const vacanciesApi = {
    getAll: (init?: RequestInit) =>
        baseApi.get<PaginatedVacanciesResponse>('/vacancies/', { page_size: PAGE_SIZE }, init),

    // отклик с резюме: попадает в раздел «Отклики» админки
    apply: (form: FormData) => baseApi.postForm<{ ok: boolean }>('/vacancy-applications/', form),
};

// Серверная загрузка для страницы «Вакансии». null — API не ответил, список догрузится в браузере
export const prefetchVacancies = async (): Promise<Vacancy[] | null> => {
    try {
        const response = await vacanciesApi.getAll(getServerFetchOptions(VACANCIES_REVALIDATE_SECONDS));
        return response.results;
    } catch (error) {
        console.error('Failed to prefetch vacancies:', error);
        return null;
    }
};
