import { News } from "../model/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAllNews(page: number = 1, pageSize: number = 12, locale: string = 'ru'): Promise<News[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/news/?page=${page}&page_size=${pageSize}`);
        if (!response.ok) return [];
        const data = await response.json();
        
        let newsArray: News[] = [];
        if (data && data.results && Array.isArray(data.results)) {
            newsArray = data.results;
        } else if (Array.isArray(data)) {
            newsArray = data;
        } else {
            return [];
        }

        return newsArray.map(item => transformNewsByLocale(item, locale));
    } catch (error) {
        console.error('Error fetching all news:', error);
        return [];
    }
}

export async function fetchLatestNews(limit: number = 4, locale: string = 'ru'): Promise<News[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/news/?page_size=${limit}&ordering=-date`);
        if (!response.ok) return [];
        const data = await response.json();
        
        let newsArray: News[] = [];
        if (data && data.results && Array.isArray(data.results)) {
            newsArray = data.results;
        } else if (Array.isArray(data)) {
            newsArray = data;
        } else {
            return [];
        }
        
        return newsArray.map(item => transformNewsByLocale(item, locale));
    } catch (error) {
        console.error('Error fetching latest news:', error);
        return [];
    }
}

export async function fetchNewsById(id: string, locale: string = 'ru'): Promise<News | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/news/${id}/`);
        if (!response.ok) return null;
        const data = await response.json();
        return transformNewsByLocale(data, locale);
    } catch (error) {
        console.error('Error fetching news by id:', error);
        return null;
    }
}

function transformNewsByLocale(news: any, locale: string): News {
    if (!news) return news;
    
    if (locale === 'ky' && news.title_ky) {
        return {
            ...news,
            title: news.title_ky,
            description: news.description_ky,
            title_ru: news.title_ru,
            title_ky: news.title_ky,
            description_ru: news.description_ru,
            description_ky: news.description_ky,
        };
    }
    
    return {
        ...news,
        title: news.title_ru || news.title,
        description: news.description_ru || news.description,
        title_ru: news.title_ru,
        title_ky: news.title_ky,
        description_ru: news.description_ru,
        description_ky: news.description_ky,
    };
}