import { useState, useEffect } from 'react';
import { api } from '@/shared/api/api';
import { News } from '@/entities/news/model/types';

export const useNewsList = () => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState<string>('all');

    const loadNews = async () => {
        try {
            setLoading(true);
            const data = await api.getNews();
            const sortedNews = [...data].sort((a, b) => {
                const dateA = new Date(a.date || a.created_at || '').getTime();
                const dateB = new Date(b.date || b.created_at || '').getTime();
                return dateB - dateA;
            });
            setNews(sortedNews);
            setError(null);
        } catch (err) {
            console.error('Error loading news:', err);
            setError('Не удалось загрузить новости');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNews();
    }, []);

    const getAvailableYears = () => {
        const years = news.map(item => {
            const date = new Date(item.date || item.created_at || '');
            return date.getFullYear();
        }).filter(year => !isNaN(year));
        return [...new Set(years)].sort((a, b) => b - a);
    };

    const filteredNews = news.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (item.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        
        let matchesYear = true;
        if (selectedYear !== 'all') {
            const itemYear = new Date(item.date || item.created_at || '').getFullYear();
            matchesYear = itemYear.toString() === selectedYear;
        }
        
        return matchesSearch && matchesYear;
    });

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedYear('all');
    };

    const hasActiveFilters = searchQuery !== '' || selectedYear !== 'all';

    return {
        news,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        selectedYear,
        setSelectedYear,
        filteredNews,
        availableYears: getAvailableYears(),
        refetch: loadNews,
        resetFilters,
        hasActiveFilters
    };
};