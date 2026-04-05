'use client';
import React from 'react';
import { ActsHeader } from '@/shared/ui/acts/ActsHeader';
import { useLocalActs } from '../model/useLocalActs';
import { useDocumentFilter } from '@/features/acts/filter/useDocumentFilter';
import { useDocumentView } from '@/features/acts/view/useDocumentView';
import { DocumentFilters } from '@/features/acts/filter/DocumentFilters';
import { DocumentGrid } from './components/DocumentGrid/DocumentGrid';
import { DocumentModal } from './components/DocumentModal/DocumentModal';
import { LoadingState } from './components/LoadingState/LoadingState';
import { ErrorState } from './components/ErrorState/ErrorState';
import styles from './LocalActsPage.module.scss';
import mobile from './LocalActsPageMobile.module.scss';

export const LocalActsList: React.FC = () => {
    const { documents, loading, error, refetch } = useLocalActs();
    const {
        searchQuery,
        setSearchQuery,
        selectedYear,
        setSelectedYear,
        filteredDocuments,
        availableYears,
        resetFilters,
        hasActiveFilters
    } = useDocumentFilter(documents);
    const { selectedDocument, isModalOpen, handleView, closeModal } = useDocumentView();

    const getHeaderTitle = () => {
        if (searchQuery) return `Результаты поиска: "${searchQuery}"`;
        if (selectedYear !== 'all') return `Локальные акты ${selectedYear} года`;
        return 'Все локальные акты';
    };

    const getCountText = () => {
        const count = filteredDocuments.length;
        if (count === 1) return 'документ';
        if (count < 5) return 'документа';
        return 'документов';
    };

    const renderContent = () => {
        if (loading) return <LoadingState />;
        if (error) return <ErrorState error={error} onRetry={refetch} />;

        return (
            <>
                <DocumentFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedYear={selectedYear}
                    onYearChange={setSelectedYear}
                    availableYears={availableYears}
                    onClearSearch={() => setSearchQuery('')}
                />

                <div className={styles.documentStats}>
                    <h2 className={styles.documentStatsTitle}>{getHeaderTitle()}</h2>
                    <span className={styles.documentStatsCount}>
                        {filteredDocuments.length} {getCountText()}
                    </span>
                </div>

                {filteredDocuments.length > 0 ? (
                    <DocumentGrid
                        documents={filteredDocuments}
                        onView={handleView}
                    />
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                                <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2"/>
                                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
                                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </div>
                        <h3>Документы не найдены</h3>
                        <p>
                            {hasActiveFilters
                                ? `По вашему запросу ничего не найдено. Попробуйте изменить условия поиска.`
                                : 'Документов пока нет. Скоро появятся новые публикации.'}
                        </p>
                        {hasActiveFilters && (
                            <button onClick={resetFilters} className={styles.resetBtn}>
                                Сбросить фильтры
                            </button>
                        )}
                    </div>
                )}
            </>
        );
    };

    return (
        <>
            <section className={`${styles.localActs} ${mobile.localActs}`}>
                <div className="container">
                    <ActsHeader 
                        title="Локальные акты"
                        description="Внутренние нормативные документы, регулирующие деятельность муниципального предприятия 'Тазалык'"
                    />
                    {renderContent()}
                </div>
            </section>

            {selectedDocument && (
                <DocumentModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={selectedDocument.title}
                    description={selectedDocument.description}
                    date={selectedDocument.date}
                />
            )}
        </>
    );
};