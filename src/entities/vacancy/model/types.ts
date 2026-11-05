import type { PaginatedResponse } from '@/shared/api';

// Вакансия из API (/api/vacancies/). Сайт получает только активные
export interface Vacancy {
    id: string;
    title_ru: string;
    title_ky: string;
    description_ru: string;
    description_ky: string;
    // каждая строка — отдельный пункт списка
    requirements_ru: string;
    requirements_ky: string;
    schedule_ru: string;
    schedule_ky: string;
    // сомы; оба null — «по договорённости»
    salary_from: number | null;
    salary_to: number | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export type PaginatedVacanciesResponse = PaginatedResponse<Vacancy>;
