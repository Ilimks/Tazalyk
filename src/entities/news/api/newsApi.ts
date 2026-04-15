import { News } from "../model/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Ваша существующая функция
export async function fetchNewsById(id: string): Promise<News | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/news/${id}/`);
        if (!response.ok) return null;
        return response.json();
    } catch (error) {
        console.error('Error fetching news:', error);
        return null;
    }
}

// Добавляем остальные API функции
export async function fetchAllNews(): Promise<News[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/news/`);
        if (!response.ok) return [];
        return response.json();
    } catch (error) {
        console.error('Error fetching all news:', error);
        return [];
    }
}

export async function createNews(data: Omit<News, 'id' | 'created_at'>): Promise<News | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/news/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) return null;
        return response.json();
    } catch (error) {
        console.error('Error creating news:', error);
        return null;
    }
}

export async function updateNews(id: string, data: Partial<News>): Promise<News | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/news/${id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) return null;
        return response.json();
    } catch (error) {
        console.error('Error updating news:', error);
        return null;
    }
}

export async function deleteNews(id: string): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/news/${id}/`, {
            method: 'DELETE'
        });
        return response.ok;
    } catch (error) {
        console.error('Error deleting news:', error);
        return false;
    }
}