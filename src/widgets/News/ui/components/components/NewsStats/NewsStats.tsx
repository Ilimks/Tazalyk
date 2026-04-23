import React from 'react';
import styles from './NewsStats.module.scss';

interface NewsStatsProps {
    count: number;
    hasFilters: boolean;
    searchQuery?: string;
    selectedYear?: string;
}

export const NewsStats: React.FC<NewsStatsProps> = ({ 
    count, 
    hasFilters, 
    searchQuery, 
    selectedYear 
}) => {
    const getTitle = () => {
        if (searchQuery) return `Результаты поиска: "${searchQuery}"`;
        if (selectedYear && selectedYear !== 'all') return `Новости ${selectedYear} года`;
        return 'Все новости';
    };

    const getCountText = () => {
        if (count === 1) return 'новость';
        if (count < 5) return 'новости';
        return 'новостей';
    };

    return (
        <div className={styles.newsStats}>
            <h2 className={styles.newsStatsTitle}>{getTitle()}</h2>
            <span className={styles.newsStatsCount}>
                {count} {getCountText()}
            </span>
        </div>
    );
};