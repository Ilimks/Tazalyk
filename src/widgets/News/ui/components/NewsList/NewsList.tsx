'use client';
import React, { useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { NewsSearch } from '../components/NewsSearch/NewsSearch';
import { NewsFilters } from '../components/NewsFilters/NewsFilters';
import { NewsStats } from '../components/NewsStats/NewsStats';
import { NewsGrid } from '../components/NewsGrid/NewsGrid';
import { NewsEmpty } from '../components/NewsEmpty/NewsEmpty';
import { LoadingState } from '@/shared/ui/LoadingState';
import { ErrorState } from '@/shared/ui/ErrorState';
import { Pagination } from '@/shared/ui/Pagination';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useNews } from '@/features/news/model/useNews';
import { useNewsFilter } from '@/features/news/filter/useNewsFilter';
import styles from './NewsList.module.scss';

interface NewsListProps {
    itemsPerPage?: number;
}

export const NewsList: React.FC<NewsListProps> = ({ itemsPerPage = 12 }) => {
    const t = useTranslations('News');
    const { 
        news, totalCount, totalPages, currentPage, isLoading, error, loadNews, changePage 
    } = useNews();
    const { searchQuery, setSearchQuery, selectedYear, setSelectedYear, resetFilters, hasActiveFilters } = useNewsFilter();
    
    useEffect(() => {
        loadNews({
            page: currentPage,
            page_size: itemsPerPage,
            search: searchQuery || undefined,
            year: selectedYear !== 'all' ? selectedYear : undefined,
        });
    }, [currentPage, searchQuery, selectedYear, itemsPerPage, loadNews]);
    
    useEffect(() => {
        if (currentPage !== 1) changePage(1);
    }, [searchQuery, selectedYear]);
    
    const handlePageChange = useCallback((page: number) => {
        changePage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [changePage]);
    
    const handleSearchClear = useCallback(() => {
        setSearchQuery('');
    }, []);
    
    if (isLoading && news.length === 0) {
        return <LoadingState />;
    }
    
    if (error && news.length === 0) {
        return (
            <div className={styles.errorWrapper}>
                <ErrorState error={error} onRetry={() => loadNews({})} />
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
                    <NewsEmpty searchQuery={searchQuery} onReset={resetFilters} />
                )}
            </div>
        </section>
    );
};