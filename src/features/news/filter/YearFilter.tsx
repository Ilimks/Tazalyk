import React from 'react';
import styles from './YearFilter.module.scss';

interface YearFilterProps {
    years: number[];
    selectedYear: string;
    onYearChange: (year: string) => void;
}

export const YearFilter: React.FC<YearFilterProps> = ({
    years,
    selectedYear,
    onYearChange
}) => {
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