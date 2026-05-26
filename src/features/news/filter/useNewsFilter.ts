import { useState, useCallback } from 'react';

export const useNewsFilter = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState<string>('all');
    
    const resetFilters = useCallback(() => {
        setSearchQuery('');
        setSelectedYear('all');
    }, []);
    
    const hasActiveFilters = searchQuery !== '' || selectedYear !== 'all';
    
    return {
        searchQuery,
        setSearchQuery,
        selectedYear,
        setSelectedYear,
        resetFilters,
        hasActiveFilters,
    };
};