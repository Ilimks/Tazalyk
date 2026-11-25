import { baseApi } from '@/shared/api';
import type { ApiSearchItem, SearchHit } from '../model/types';

const SCORE_IN_TITLE = 70;
const SCORE_IN_TEXT = 30;

// У товаров и документов нет своих страниц: ведём в их раздел
const hitUrl = (item: ApiSearchItem): string => {
    switch (item.type) {
        case 'news':
            return `/news/${encodeURIComponent(item.id)}`;
        case 'product':
            return '/shop';
        case 'vacancy':
            return '/vacancies';
        case 'local_act':
            return '/acts';
        case 'legislation':
            return '/legislation';
        case 'procurement':
            return '/procurement';
    }
};

// Одна и та же запись, введённая в админке несколько раз
const copyKey = (item: ApiSearchItem) =>
    [item.type, item.date, item.title_ru, item.title_ky, item.snippet_ru, item.snippet_ky].join('|');

const newsDate = ({ type, date }: ApiSearchItem) =>
    type === 'news' && date ? date.slice(0, 10).split('-').reverse().join('.') : undefined;

export const searchApi = {
    find: async (query: string, limit: number, locale: string, signal: AbortSignal): Promise<SearchHit[]> => {
        const { results } = await baseApi.get<{ results: ApiSearchItem[] }>(
            '/search/',
            { q: query, limit },
            { signal }
        );
        const isKy = locale === 'ky';
        const keys = results.map(copyKey);
        const unique = results.filter((_, index) => keys.indexOf(keys[index]) === index);
        return unique.map((item) => ({
            key: `${item.type}:${item.id}`,
            type: item.type,
            title: (isKy ? item.title_ky : item.title_ru) || item.title_ru,
            snippet: (isKy ? item.snippet_ky : item.snippet_ru) || item.snippet_ru,
            url: hitUrl(item),
            date: newsDate(item),
            score: item.in_title ? SCORE_IN_TITLE : SCORE_IN_TEXT,
        }));
    },
};
