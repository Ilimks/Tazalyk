import type { Vacancy } from '../model/types';

type LocalizedField = 'title' | 'description' | 'requirements' | 'schedule';

// Кыргызский текст, если он заполнен, иначе русский
export const getVacancyText = (vacancy: Vacancy, field: LocalizedField, locale: string): string =>
    (locale === 'ky' && vacancy[`${field}_ky` as `${LocalizedField}_ky`]?.trim()) ||
    vacancy[`${field}_ru` as `${LocalizedField}_ru`];

// «Права категории C\n- Стаж от 2 лет» → ['Права категории C', 'Стаж от 2 лет']
export const splitRequirements = (text: string): string[] =>
    text
        .split('\n')
        .map((line) => line.replace(/^\s*[-–—•*]\s*/, '').trim())
        .filter(Boolean);
