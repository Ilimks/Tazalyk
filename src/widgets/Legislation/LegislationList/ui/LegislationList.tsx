'use client';
import React from 'react';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useLegislation } from '../model/useLegislation';
import { useLegislationFilter } from '@/features/legislation/filter';
import { useLegislationView } from '@/features/legislation/view';
import { useDocumentDownload } from '@/features/legislation/download';
import { LegislationFilters } from '@/features/legislation/filter';
import { LegislationGrid } from './components/LegislationGrid/LegislationGrid';
import { LegislationModal } from './components/LegislationModal/LegislationModal';
import { LoadingState } from './components/LoadingState/LoadingState';
import { ErrorState } from './components/ErrorState/ErrorState';
import styles from './LegislationList.module.scss';
import mobile from './LegislationListMobile.module.scss';

export const LegislationList: React.FC = () => {
    const { documents, loading, error, refetch } = useLegislation();
    const {
        searchQuery,
        setSearchQuery,
        selectedYear,
        setSelectedYear,
        filteredDocuments,
        availableYears,
        resetFilters,
        hasActiveFilters
    } = useLegislationFilter(documents);
    const { selectedDocument, isModalOpen, handleView, closeModal } = useLegislationView();
    const { handleDownload } = useDocumentDownload();

    const getHeaderTitle = () => {
        if (searchQuery) return `Результаты поиска: "${searchQuery}"`;
        if (selectedYear !== 'all') return `Законодательство ${selectedYear} года`;
        return 'Все законодательные документы';
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
                <LegislationFilters
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
                    <LegislationGrid
                        documents={filteredDocuments}
                        onView={handleView}
                        onDownload={handleDownload}
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
            <section className={`${styles.legislation} ${mobile.legislation}`}>
                <div className="container">
                    <PageHeader 
                        title="Законодательство Кыргызской Республики"
                        description="Нормативно-правовые акты, регулирующие деятельность муниципального предприятия 'Тазалык'"
                    />
                    {renderContent()}
                </div>
            </section>

            {selectedDocument && (
                <LegislationModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={selectedDocument.title}
                    pdfUrl={selectedDocument.pdfUrl}
                    onDownload={() => handleDownload(selectedDocument.pdfUrl, selectedDocument.fileName)}
                />
            )}
        </>
    );
};