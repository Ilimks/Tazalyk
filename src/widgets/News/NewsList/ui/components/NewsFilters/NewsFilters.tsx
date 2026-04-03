import React from 'react';
import styles from './NewsFilters.module.scss';

interface NewsFiltersProps {
    years: number[];
    selectedYear: string;
    onYearChange: (year: string) => void;
}

export const NewsFilters: React.FC<NewsFiltersProps> = ({ years, selectedYear, onYearChange }) => {
    if (years.length === 0) return null;

    return (
        <div className={styles.yearFilters}>
            <button
                className={`${styles.yearBtn} ${selectedYear === 'all' ? styles.yearBtnActive : ''}`}
                onClick={() => onYearChange('all')}
            >
                Все года
            </button>
            {years.map(year => (
                <button
                    key={year}
                    className={`${styles.yearBtn} ${selectedYear === year.toString() ? styles.yearBtnActive : ''}`}
                    onClick={() => onYearChange(year.toString())}
                >
                    {year}
                </button>
            ))}
        </div>
    );
};