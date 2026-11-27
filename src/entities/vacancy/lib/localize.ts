import type { Vacancy } from '../model/types';

type LocalizedField = 'title' | 'description' | 'requirements' | 'schedule';

export const getVacancyText = (vacancy: Vacancy, field: LocalizedField, locale: string): string =>
    (locale === 'ky' && vacancy[`${field}_ky` as `${LocalizedField}_ky`]?.trim()) ||
    vacancy[`${field}_ru` as `${LocalizedField}_ru`];

export const splitRequirements = (text: string): string[] =>
    text
        .split('\n')
        .map((line) => line.replace(/^\s*[-–—•*]\s*/, '').trim())
        .filter(Boolean);
