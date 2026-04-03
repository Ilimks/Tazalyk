import React from 'react';
import styles from './NewsEmpty.module.scss';

interface NewsEmptyProps {
    searchQuery?: string;
    onReset?: () => void;
}

export const NewsEmpty: React.FC<NewsEmptyProps> = ({ searchQuery, onReset }) => {
    return (
        <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                    <path d="M20 12v8H4v-8M12 2v10m-4-4l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="16" r="1" fill="currentColor"/>
                </svg>
            </div>
            <h3 className={styles.emptyTitle}>Новости не найдены</h3>
            <p className={styles.emptyText}>
                {searchQuery 
                    ? `По запросу "${searchQuery}" ничего не найдено. Попробуйте изменить условия поиска.`
                    : 'Новостей за выбранный период не найдено.'}
            </p>
            {searchQuery && onReset && (
                <button className={styles.resetFiltersBtn} onClick={onReset}>
                    Сбросить фильтры
                </button>
            )}
        </div>
    );
};