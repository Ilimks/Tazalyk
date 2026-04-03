import React from 'react';
import styles from './NewsSearch.module.scss';

interface NewsSearchProps {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
}

export const NewsSearch: React.FC<NewsSearchProps> = ({ value, onChange, onClear }) => {
    return (
        <div className={styles.searchBar}>
            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
                type="text"
                placeholder="Поиск новостей..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={styles.searchInput}
            />
            {value && (
                <button 
                    className={styles.clearSearch}
                    onClick={onClear}
                    aria-label="Очистить поиск"
                >
                    ×
                </button>
            )}
        </div>
    );
};