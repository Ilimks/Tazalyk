import { Suspense } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';
import { prefetchProductFilters } from '@/entities/product';
import { getShopHref, serializeShopQuery, type ShopQuery } from '@/features/product-filters';
import { PageHeader } from '@/shared/ui/PageHeader';
import { loadCatalogPage, PAGE_OUT_OF_RANGE } from '../model/loadCatalogPage';
import { ShopCatalog } from './ShopCatalog/ShopCatalog';
import { CatalogGridSkeleton } from './ShopCatalog/CatalogGridSkeleton';
import styles from './ShopPage.module.scss';

interface ShopPageProps {
    // фильтры из адреса страницы
    query: ShopQuery;
}

// Первая страница каталога с выбранными фильтрами загружается на сервере — она сразу есть в HTML
export const ShopPage = async ({ query }: ShopPageProps) => {
    const [t, locale, data, filterOptions] = await Promise.all([
        getTranslations('Shop'),
        getLocale(),
        loadCatalogPage(query),
        prefetchProductFilters(),
    ]);

    if (data === PAGE_OUT_OF_RANGE) {
        redirect({ href: getShopHref({ ...query, page: 1 }), locale });
    }

    return (
        <div className={styles.shopPage}>
            <PageHeader title={t('title')} description={t('description')} />
            <div className="container">
                <Suspense fallback={<CatalogGridSkeleton />}>
                    <ShopCatalog
                        dataKey={serializeShopQuery(query)}
                        initialData={data === PAGE_OUT_OF_RANGE ? null : data}
                        initialFilterOptions={filterOptions}
                    />
                </Suspense>
            </div>
        </div>
    );
};
