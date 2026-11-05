import { News } from '../model/types';

// Кыргызский текст, если он заполнен, иначе русский
export const getNewsTitle = (news: News, locale: string): string =>
    (locale === 'ky' && news.title_ky) || news.title_ru;

export const getNewsDescription = (news: News, locale: string): string =>
    (locale === 'ky' && news.description_ky) || news.description_ru;

export const getNewsDate = (news: News): string => news.date || news.created_at;
