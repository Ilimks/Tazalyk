'use client';
import React from 'react';
import { useNewsList } from '../model/useNewsList';
import { NewsHeader } from './components/NewsHeader/NewsHeader';
import { NewsSearch } from './components/NewsSearch/NewsSearch';
import { NewsFilters } from './components/NewsFilters/NewsFilters';
import { NewsStats } from './components/NewsStats/NewsStats';
import { NewsGrid } from './components/NewsGrid/NewsGrid';
import { NewsEmpty } from './components/NewsEmpty/NewsEmpty';
import { LoadingState } from './components/LoadingState/LoadingState';
import { ErrorState } from './components/ErrorState/ErrorState';
import styles from './NewsList.module.scss';

export const NewsList: React.FC = () => {
    const {
        loading,
        error,
        searchQuery,
        setSearchQuery,
        selectedYear,
        setSelectedYear,
        filteredNews,
        availableYears,
        refetch,
        resetFilters,
        hasActiveFilters
    } = useNewsList();

    const renderContent = () => {
        if (loading) return <LoadingState />;
        if (error) return <ErrorState error={error} onRetry={refetch} />;

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
                {filteredNews.length > 0 ? (
                    <NewsGrid news={filteredNews} />
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