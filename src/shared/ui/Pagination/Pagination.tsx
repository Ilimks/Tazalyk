import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    const t = useTranslations('Pagination');

    if (totalPages <= 1) {
        return null;
    }

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

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
                aria-label={t('previous')}
            >
                <ChevronLeft size={20} aria-hidden />
            </button>

            {startPage > 1 && (
                <>
                    <button 
                        className={styles.paginationItem} 
                        onClick={() => onPageChange(1)}
                        aria-label={t('first')}
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
                    aria-label={t('page', { page })}
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
                        aria-label={t('last')}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                className={styles.paginationArrow}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label={t('next')}
            >
                <ChevronRight size={20} aria-hidden />
            </button>

            {totalItems !== undefined && currentItemsCount !== undefined && (
                <div className={styles.paginationInfo}>
                    {t('shown', { count: currentItemsCount, total: totalItems })}
                </div>
            )}
        </div>
    );
};