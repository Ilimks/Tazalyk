// src/shared/ui/Pagination/Pagination.tsx
import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage?: number;
    totalItems?: number;
    currentItemsCount?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    currentItemsCount,
}) => {
    console.log('🔘 Pagination component render:', { currentPage, totalPages, totalItems, currentItemsCount });
    
    if (totalPages <= 1) {
        console.log('🔘 Pagination скрыта, так как totalPages <= 1');
        return null;
    }

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className={styles.pagination}>
            <button
                className={styles.paginationArrow}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Предыдущая страница"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>

            {startPage > 1 && (
                <>
                    <button 
                        className={styles.paginationItem} 
                        onClick={() => onPageChange(1)}
                        aria-label="Первая страница"
                    >
                        1
                    </button>
                    {startPage > 2 && <span className={styles.paginationDots}>...</span>}
                </>
            )}

            {pages.map(page => (
                <button
                    key={page}
                    className={`${styles.paginationItem} ${currentPage === page ? styles.active : ''}`}
                    onClick={() => onPageChange(page)}
                    aria-label={`Страница ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className={styles.paginationDots}>...</span>}
                    <button 
                        className={styles.paginationItem} 
                        onClick={() => onPageChange(totalPages)}
                        aria-label="Последняя страница"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                className={styles.paginationArrow}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Следующая страница"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>

            {totalItems !== undefined && currentItemsCount !== undefined && (
                <div className={styles.paginationInfo}>
                    Показано {currentItemsCount} из {totalItems}
                </div>
            )}
        </div>
    );
};