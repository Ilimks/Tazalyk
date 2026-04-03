// features/news/filter/useNewsFilter.ts
import { useState, useMemo } from 'react';
import { News } from '@/entities/news';

export const useNewsFilter = (news: News[]) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState<string>('all');

    const availableYears = useMemo(() => {
        const years = news.map(item => {
            const date = new Date(item.date || item.created_at || '');
            return date.getFullYear();
        }).filter(year => !isNaN(year));
        return [...new Set(years)].sort((a, b) => b - a);
    }, [news]);

    const filteredNews = useMemo(() => {
        return news.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  (item.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
            
            let matchesYear = true;
            if (selectedYear !== 'all') {
                const itemYear = new Date(item.date || item.created_at || '').getFullYear();
                matchesYear = itemYear.toString() === selectedYear;
            }
            
            return matchesSearch && matchesYear;
        });
    }, [news, searchQuery, selectedYear]);

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedYear('all');
    };

    const hasActiveFilters = searchQuery !== '' || selectedYear !== 'all';

    return {
        searchQuery,
        setSearchQuery,
        selectedYear,
        setSelectedYear,
        filteredNews,
        availableYears,
        resetFilters,
        hasActiveFilters
    };
};