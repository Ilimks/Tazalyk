'use client';
import React, { useEffect, useState } from 'react';
import { NewsHeader } from './components/NewsHeader/NewsHeader';
import { NewsSearch } from './components/NewsSearch/NewsSearch';
import { NewsFilters } from './components/NewsFilters/NewsFilters';
import { NewsStats } from './components/NewsStats/NewsStats';
import { NewsGrid } from './components/NewsGrid/NewsGrid';
import { NewsEmpty } from './components/NewsEmpty/NewsEmpty';
import { LoadingState } from '@/shared/ui/LoadingState';
import { ErrorState } from '@/shared/ui/ErrorState';
import { Pagination } from '@/shared/ui/Pagination';
import { useNews } from '@/features/news/model/useNews';
import { useNewsFilter } from '@/features/news/filter/useNewsFilter';
import styles from './NewsList.module.scss';

interface NewsListProps {
    itemsPerPage?: number;
}

export const NewsList: React.FC<NewsListProps> = ({ itemsPerPage = 12 }) => {
    const { news, isLoading, error, loadNews } = useNews();
    const [currentPage, setCurrentPage] = useState(1);
    
    const {
        searchQuery,
        setSearchQuery,
        selectedYear,
        setSelectedYear,
        filteredNews,
        availableYears,
        resetFilters,
        hasActiveFilters
    } = useNewsFilter({ news });

    // Загружаем новости при монтировании
    useEffect(() => {
        if (news.length === 0) {
            loadNews();
        }
    }, [loadNews, news.length]);

    // Сбрасываем страницу при изменении фильтров
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedYear]);

    // Пагинация
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedNews = filteredNews.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderContent = () => {
        if (isLoading && news.length === 0) {
            return <LoadingState />;
        }
        
        if (error && news.length === 0) {
            let errorTitle = "Ошибка загрузки новостей";
            let errorMessage = error;
            
            if (error.includes("404")) {
                errorTitle = "Новости не найдены";
                errorMessage = "Не удалось загрузить список новостей. Пожалуйста, попробуйте позже.";
            } else if (error.includes("network") || error.includes("fetch")) {
                errorTitle = "Проблема с соединением";
                errorMessage = "Проверьте подключение к интернету и попробуйте снова.";
            } else if (error.includes("timeout")) {
                errorTitle = "Превышено время ожидания";
                errorMessage = "Сервер долго не отвечает. Пожалуйста, попробуйте позже.";
            }
            
            return (
                <div className={styles.errorWrapper}>
                    <ErrorState 
                        error={errorMessage} 
                        onRetry={loadNews}
                        title={errorTitle}
                        variant="compact"
                    />
                </div>
            );
        }

        return (
            <>
                <NewsSearch 
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onClear={() => setSearchQuery('')}
                />
                <NewsFilters 
                    years={availableYears}
                    selectedYear={selectedYear}
                    onYearChange={setSelectedYear}
                />
                <NewsStats 
                    count={filteredNews.length}
                    hasFilters={hasActiveFilters}
                    searchQuery={searchQuery}
                    selectedYear={selectedYear}
                />
                {paginatedNews.length > 0 ? (
                    <>
                        <NewsGrid news={paginatedNews} />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            totalItems={filteredNews.length}
                            currentItemsCount={paginatedNews.length}
                        />
                    </>
                ) : (
                    <NewsEmpty 
                        searchQuery={searchQuery}
                        onReset={resetFilters}
                    />
                )}
            </>
        );
    };

    return (
        <section className={styles.newsList}>
            <div className="container">
                <NewsHeader />
                {renderContent()}
            </div>
        </section>
    );
};