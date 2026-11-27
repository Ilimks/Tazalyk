import { productsApi, getProductsServerFetchOptions } from './productsApi';
import type { PaginatedProductsResponse, ProductFilterOptions, ProductQuery } from '../model/types';

export const prefetchProducts = async (
    query: ProductQuery = {}
): Promise<PaginatedProductsResponse | null> => {
    try {
        return await productsApi.getAll(query, getProductsServerFetchOptions());
    } catch (error) {
        console.error('Failed to prefetch products:', error);
        return null;
    }
};

export const prefetchProductFilters = async (): Promise<ProductFilterOptions | null> => {
    try {
        return await productsApi.getFilters(getProductsServerFetchOptions());
    } catch (error) {
        console.error('Failed to prefetch product filters:', error);
        return null;
    }
};
