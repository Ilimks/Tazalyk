import { ApiError, getUncachedServerFetchOptions } from '@/shared/api';
import { productsApi, type PaginatedProductsResponse } from '@/entities/product';
import { toProductQuery, type ShopQuery } from '@/features/product-filters';

export const PAGE_OUT_OF_RANGE = 'out-of-range' as const;

export const loadCatalogPage = async (
    query: ShopQuery
): Promise<PaginatedProductsResponse | typeof PAGE_OUT_OF_RANGE | null> => {
    try {
        return await productsApi.getAll(toProductQuery(query), getUncachedServerFetchOptions());
    } catch (error) {
        if (error instanceof ApiError && error.status === 404 && query.page > 1) return PAGE_OUT_OF_RANGE;
        console.error('Failed to prefetch shop catalog:', error);
        return null;
    }
};
