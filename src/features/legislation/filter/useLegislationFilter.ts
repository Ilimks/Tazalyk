import { useState, useMemo } from 'react';
import { LegislationDocument } from '@/entities/legislation/model/types';

export const useLegislationFilter = (documents: LegislationDocument[]) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState<string>('all');

    const availableYears = useMemo(() => {
        const years = documents.map(item => {
            const date = new Date(item.date || item.created_at);
            return date.getFullYear();
        }).filter(year => !isNaN(year));
        return [...new Set(years)].sort((a, b) => b - a);
    }, [documents]);

    const filteredDocuments = useMemo(() => {
        return documents.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  (item.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
            
            let matchesYear = true;
            if (selectedYear !== 'all') {
                const itemYear = new Date(item.date || item.created_at).getFullYear();
                matchesYear = itemYear.toString() === selectedYear;
            }
            
            return matchesSearch && matchesYear;
        });
    }, [documents, searchQuery, selectedYear]);

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
        filteredDocuments,
        availableYears,
        resetFilters,
        hasActiveFilters
    };
};