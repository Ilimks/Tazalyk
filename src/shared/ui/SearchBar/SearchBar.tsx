// shared/ui/SearchBar/SearchBar.tsx
import React from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    onClear?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    placeholder = 'Поиск...',
    onClear
}) => {
    return (
        <div className={styles.searchBar}>
            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={styles.searchInput}
            />
            {value && onClear && (
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