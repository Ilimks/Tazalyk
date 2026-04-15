import { useState, useMemo, useCallback } from 'react';
import { News } from '@/entities/news';

interface UseNewsFilterProps {
    news: News[];
    initialSearchQuery?: string;
    initialSelectedYear?: string;
    itemsPerPage?: number;
}

export const useNewsFilter = ({ 
    news, 
    initialSearchQuery = '', 
    initialSelectedYear = 'all',
    itemsPerPage = 6
}: UseNewsFilterProps) => {
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [selectedYear, setSelectedYear] = useState(initialSelectedYear);
    const [currentPage, setCurrentPage] = useState(1);

    // Получаем доступные годы из новостей
    const availableYears = useMemo(() => {
        const years = news
            .map(item => {
                const dateString = item.date || item.created_at;
                if (!dateString) return null;
                const date = new Date(dateString);
                const year = date.getFullYear();
                return isNaN(year) ? null : year;
            })
            .filter((year): year is number => year !== null);
        
        return [...new Set(years)].sort((a, b) => b - a);
    }, [news]);

    // Фильтруем новости
    const filteredNews = useMemo(() => {
        let result = [...news];

        // Фильтр по поисковому запросу
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(item => 
                item.title.toLowerCase().includes(query) ||
                (item.description?.toLowerCase() || '').includes(query)
            );
        }

        // Фильтр по году
        if (selectedYear !== 'all') {
            result = result.filter(item => {
                const dateString = item.date || item.created_at;
                if (!dateString) return false;
                const date = new Date(dateString);
                const year = date.getFullYear();
                return !isNaN(year) && year.toString() === selectedYear;
            });
        }

        // Сортировка по дате (новые сверху)
        result.sort((a, b) => {
            const dateA = new Date(a.date || a.created_at || 0);
            const dateB = new Date(b.date || b.created_at || 0);
            return dateB.getTime() - dateA.getTime();
        });

        return result;
    }, [news, searchQuery, selectedYear]);

    // Пагинация
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const paginatedNews = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredNews.slice(start, end);
    }, [filteredNews, currentPage, itemsPerPage]);

    // Сброс фильтров
    const resetFilters = useCallback(() => {
        setSearchQuery('');
        setSelectedYear('all');
        setCurrentPage(1);
    }, []);

    // Смена страницы
    const goToPage = useCallback((page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    }, [totalPages]);

    const hasActiveFilters = searchQuery !== '' || selectedYear !== 'all';

    return {
        // Состояние
        searchQuery,
        setSearchQuery,
        selectedYear,
        setSelectedYear,
        currentPage,
        setCurrentPage,
        
        // Данные
        filteredNews,
        paginatedNews,
        availableYears,
        
        // Статистика
        totalNews: news.length,
        filteredCount: filteredNews.length,
        totalPages,
        
        // Действия
        resetFilters,
        goToPage,
        hasActiveFilters,
        
        // Пагинация
        nextPage: () => goToPage(currentPage + 1),
        prevPage: () => goToPage(currentPage - 1),
    };
};