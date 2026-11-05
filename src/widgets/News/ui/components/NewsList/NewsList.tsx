'use client';
import React, { useEffect, useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import { NewsSearch } from '../components/NewsSearch/NewsSearch';
import { NewsFilters } from '../components/NewsFilters/NewsFilters';
import { NewsStats } from '../components/NewsStats/NewsStats';
import { NewsGrid } from '../components/NewsGrid/NewsGrid';
import { EmptyState } from '@/shared/ui/EmptyState';
import { LoadingState } from '@/shared/ui/LoadingState';
import { ErrorState } from '@/shared/ui/ErrorState';
import { Pagination } from '@/shared/ui/Pagination';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useNews } from '@/features/news/model/useNews';
import { useNewsFilter } from '@/features/news/filter/useNewsFilter';
import type { PaginatedNewsResponse } from '@/entities/news';
import styles from './NewsList.module.scss';

interface NewsListProps {
    itemsPerPage?: number;
    // первая страница без фильтров, загруженная на сервере
    initialData?: PaginatedNewsResponse | null;
}

export const NewsList: React.FC<NewsListProps> = ({ itemsPerPage = 12, initialData = null }) => {
    const t = useTranslations('News');
    const tEmpty = useTranslations('EmptyState');
    const {
        news: loadedNews, totalCount: loadedCount, currentPage, isLoading, error, loadNews, changePage
    } = useNews();
    const { searchQuery, setSearchQuery, selectedYear, setSelectedYear, resetFilters, hasActiveFilters } = useNewsFilter();

    // Пока пользователь не менял фильтры и страницу, показываем данные с сервера без повторного запроса
    const [usingInitial, setUsingInitial] = useState(initialData !== null);
    const isInitialQuery = currentPage === 1 && !searchQuery && selectedYear === 'all';

    const news = usingInitial && initialData ? initialData.results : loadedNews;
    const totalCount = usingInitial && initialData ? initialData.count : loadedCount;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    useEffect(() => {
        if (usingInitial) {
            if (isInitialQuery) return;
            setUsingInitial(false);
        }
        loadNews({
            page: currentPage,
            page_size: itemsPerPage,
            search: searchQuery || undefined,
            year: selectedYear !== 'all' ? selectedYear : undefined,
        });
        // usingInitial и isInitialQuery выводятся из перечисленных зависимостей
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, searchQuery, selectedYear, itemsPerPage, loadNews]);
    
    useEffect(() => {
        if (currentPage !== 1) changePage(1);
        // сбрасываем страницу только при смене фильтров, а не при смене страницы
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, selectedYear]);
    
    const handlePageChange = useCallback((page: number) => {
        changePage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [changePage]);
    
    const handleSearchClear = useCallback(() => {
        setSearchQuery('');
    }, [setSearchQuery]);
    
    if (isLoading && news.length === 0) {
        return <LoadingState />;
    }
    
    if (error && news.length === 0) {
        return (
            <div className={styles.errorWrapper}>
                <div className="container">
                    <ErrorState error={error} onRetry={() => loadNews({})} />
                </div>
            </div>
        );
    }
    
    return (
        <section className={styles.newsList}>
            <PageHeader title={t('NewsTitle')} description={t('NewsDescription')} />
            <div className="container">
                <NewsSearch value={searchQuery} onChange={setSearchQuery} onClear={handleSearchClear} />
                <NewsFilters 
                    years={[]} 
                    selectedYear={selectedYear} 
                    onYearChange={setSelectedYear} 
                />
                <NewsStats count={totalCount} hasFilters={hasActiveFilters} searchQuery={searchQuery} selectedYear={selectedYear} />
                
                {news.length > 0 ? (
                    <>
                        <NewsGrid news={news} />
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            totalItems={totalCount}
                            currentItemsCount={news.length}
                        />
                    </>
                ) : (
                    <EmptyState
                        variant="news"
                        description={searchQuery
                            ? tEmpty('searchNotFound', { query: searchQuery })
                            : undefined}
                        actionText={hasActiveFilters ? tEmpty('resetFilters') : undefined}
                        onAction={resetFilters}
                    />
                )}
            </div>
        </section>
    );
};