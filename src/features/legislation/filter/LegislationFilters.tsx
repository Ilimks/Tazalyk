import React from 'react';
import { SearchBar } from '@/shared/ui/SearchBar';
import styles from './LegislationFilters.module.scss';

interface LegislationFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    selectedYear: string;
    onYearChange: (year: string) => void;
    availableYears: number[];
    onClearSearch: () => void;
}

export const LegislationFilters: React.FC<LegislationFiltersProps> = ({
    searchQuery,
    onSearchChange,
    selectedYear,
    onYearChange,
    availableYears,
    onClearSearch
}) => {
    return (
        <div className={styles.filtersSection}>
            <SearchBar
                value={searchQuery}
                onChange={onSearchChange}
                placeholder="Поиск документов..."
                onClear={onClearSearch}
            />
            
            {availableYears.length > 0 && (
                <div className={styles.yearFilters}>
                    <button
                        className={`${styles.yearBtn} ${selectedYear === 'all' ? styles.yearBtnActive : ''}`}
                        onClick={() => onYearChange('all')}
                    >
                        Все года
                    </button>
                    {availableYears.map(year => (
                        <button
                            key={year}
                            className={`${styles.yearBtn} ${selectedYear === year.toString() ? styles.yearBtnActive : ''}`}
                            onClick={() => onYearChange(year.toString())}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};