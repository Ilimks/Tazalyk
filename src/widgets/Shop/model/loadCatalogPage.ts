import { ApiError } from '@/shared/api';
import {
    productsApi,
    getProductsServerFetchOptions,
    type PaginatedProductsResponse,
} from '@/entities/product';
import { toProductQuery, type ShopQuery } from '@/features/product-filters';

// страницы с таким номером нет (API отвечает 404) — например, по старой ссылке после сокращения каталога
export const PAGE_OUT_OF_RANGE = 'out-of-range' as const;

// Серверная загрузка страницы каталога. null — API недоступен, каталог догрузится в браузере
export const loadCatalogPage = async (
    query: ShopQuery
): Promise<PaginatedProductsResponse | typeof PAGE_OUT_OF_RANGE | null> => {
    try {
        return await productsApi.getAll(toProductQuery(query), getProductsServerFetchOptions());
    } catch (error) {
        if (error instanceof ApiError && error.status === 404 && query.page > 1) return PAGE_OUT_OF_RANGE;
        console.error('Failed to prefetch shop catalog:', error);
        return null;
    }
};
