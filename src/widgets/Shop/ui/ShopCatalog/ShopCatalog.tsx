'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SearchX, SlidersHorizontal } from 'lucide-react';
import {
    ProductCard,
    PRODUCTS_PAGE_SIZE,
    type PaginatedProductsResponse,
    type ProductFilterOptions,
} from '@/entities/product';
import { AddToCartButton } from '@/features/cart';
import {
    ProductFilters,
    SortSelect,
    countActiveFilters,
    useShopQuery,
    type ShopQuery,
} from '@/features/product-filters';
import { EmptyState } from '@/shared/ui/EmptyState';
import { ErrorState } from '@/shared/ui/ErrorState';
import { Pagination } from '@/shared/ui/Pagination';
import { useCatalogData, useFilterOptions } from '../../model/useCatalogData';
import { FiltersDrawer } from '../FiltersDrawer/FiltersDrawer';
import { CatalogGridSkeleton } from './CatalogGridSkeleton';
import styles from './ShopCatalog.module.scss';

interface ShopCatalogProps {
    // для какого адреса сервер загрузил initialData (строка запроса без «?»)
    dataKey: string;
    initialData: PaginatedProductsResponse | null;
    initialFilterOptions: ProductFilterOptions | null;
}

// ширина, с которой фильтры показываются колонкой слева, а не в выдвижной панели
const DESKTOP_QUERY = '(min-width: 1001px)';
// липкая навигация сайта — чтобы при смене страницы начало каталога не пряталось под ней
const STICKY_HEADER_OFFSET = 90;

export const ShopCatalog: React.FC<ShopCatalogProps> = ({ dataKey, initialData, initialFilterOptions }) => {
    const t = useTranslations('Shop');
    const { query, appliedQuery, queryKey, isPending, setFilters, setOrdering, setPage, reset } = useShopQuery();
    const filterOptions = useFilterOptions(initialFilterOptions);
    const catalog = useCatalogData({ query: appliedQuery, queryKey, dataKey, initialData });
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const topRef = useRef<HTMLDivElement>(null);

    const activeFilters = countActiveFilters(query);
    const data = catalog.data;
    const totalPages = data ? Math.ceil(data.count / PRODUCTS_PAGE_SIZE) : 0;
    const showSkeleton = isPending || (catalog.isLoading && !data);

    // страницы с таким номером больше нет — открываем первую
    useEffect(() => {
        if (catalog.isOutOfRange) setPage(1);
    }, [catalog.isOutOfRange, setPage]);

    // на широком экране панель не нужна: фильтры видны слева
    useEffect(() => {
        if (!isDrawerOpen) return;
        const media = window.matchMedia(DESKTOP_QUERY);
        const handleChange = () => {
            if (media.matches) setIsDrawerOpen(false);
        };
        handleChange();
        media.addEventListener('change', handleChange);
        return () => media.removeEventListener('change', handleChange);
    }, [isDrawerOpen]);

    const handlePageChange = useCallback(
        (page: number) => {
            setPage(page);
            const top = topRef.current;
            if (top) {
                const y = top.getBoundingClientRect().top + window.scrollY - STICKY_HEADER_OFFSET;
                window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
            }
        },
        [setPage]
    );

    const handleApplyDrawer = useCallback(
        (next: ShopQuery) => {
            setIsDrawerOpen(false);
            setFilters(next);
        },
        [setFilters]
    );

    const renderResults = () => {
        if (showSkeleton) {
            return <CatalogGridSkeleton count={data?.results.length || 8} />;
        }

        if (catalog.isError && !data) {
            return (
                <ErrorState
                    title={t('loadErrorTitle')}
                    error={t('loadErrorMessage')}
                    onRetry={catalog.retry}
                    variant="compact"
                />
            );
        }

        if (!data || data.results.length === 0) {
            return (
                <EmptyState
                    icon={SearchX}
                    title={t('emptyTitle')}
                    description={activeFilters > 0 ? t('emptyFiltered') : t('emptyCatalog')}
                    actionText={activeFilters > 0 ? t('filters.resetAll') : undefined}
                    onAction={reset}
                    className={styles.empty}
                />
            );
        }

        return (
            <>
                <ul className={styles.grid}>
                    {data.results.map((product) => (
                        <li key={product.id} className={styles.gridItem}>
                            <ProductCard product={product} action={<AddToCartButton product={product} />} />
                        </li>
                    ))}
                </ul>
                <Pagination
                    currentPage={appliedQuery.page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    totalItems={data.count}
                    currentItemsCount={data.results.length}
                />
            </>
        );
    };

    return (
        <div className={styles.catalog} ref={topRef}>
            <aside className={styles.sidebar} aria-label={t('filters.title')}>
                <div className={styles.sidebarHeader}>
                    <h2 className={styles.sidebarTitle}>{t('filters.title')}</h2>
                    {activeFilters > 0 && (
                        <button type="button" className={styles.resetLink} onClick={reset}>
                            {t('filters.reset')}
                        </button>
                    )}
                </div>
                <ProductFilters value={query} onChange={setFilters} options={filterOptions} priceDebounceMs={600} />
            </aside>

            <div className={styles.main}>
                <div className={styles.toolbar}>
                    <button
                        type="button"
                        className={styles.filtersButton}
                        onClick={() => setIsDrawerOpen(true)}
                        aria-haspopup="dialog"
                        aria-expanded={isDrawerOpen}
                    >
                        <SlidersHorizontal aria-hidden />
                        <span>{t('filters.title')}</span>
                        {activeFilters > 0 && <span className={styles.filtersCount}>{activeFilters}</span>}
                    </button>
                    <p className={styles.count} aria-live="polite">
                        {data && !showSkeleton ? t('found', { count: data.count }) : ' '}
                    </p>
                    <SortSelect className={styles.sort} value={query.ordering} onChange={setOrdering} />
                </div>

                <div className={styles.results} aria-busy={showSkeleton}>
                    {renderResults()}
                </div>
            </div>

            {isDrawerOpen && (
                <FiltersDrawer
                    initialQuery={query}
                    options={filterOptions}
                    onApply={handleApplyDrawer}
                    onClose={() => setIsDrawerOpen(false)}
                />
            )}
        </div>
    );
};
