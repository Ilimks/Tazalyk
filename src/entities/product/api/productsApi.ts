import { baseApi, getServerFetchOptions } from '@/shared/api';
import type {
    PaginatedProductsResponse,
    Product,
    ProductFilterOptions,
    ProductQuery,
} from '../model/types';

// Как часто сервер обновляет кэш каталога, секунд
export const PRODUCTS_REVALIDATE_SECONDS = 60;

// Опции серверной загрузки каталога (общий хелпер из shared/api с кэшем каталога)
export const getProductsServerFetchOptions = (): RequestInit =>
    getServerFetchOptions(PRODUCTS_REVALIDATE_SECONDS);

// Списки (объёмы, материалы) API принимает через запятую: volume=120,240
const toApiParams = (query: ProductQuery) => ({
    page: query.page && query.page > 1 ? query.page : undefined,
    page_size: query.page_size || undefined,
    volume: query.volume?.length ? query.volume.join(',') : undefined,
    material: query.material?.length ? query.material.join(',') : undefined,
    price_min: query.price_min ?? undefined,
    price_max: query.price_max ?? undefined,
    in_stock: query.in_stock ? 1 : undefined,
    featured: query.featured ? 1 : undefined,
    q: query.q?.trim() || undefined,
    ordering: query.ordering || undefined,
});

export const productsApi = {
    getAll: (query: ProductQuery = {}, init?: RequestInit) =>
        baseApi.get<PaginatedProductsResponse>('/shop/products/', toApiParams(query), init),

    getById: (id: string, init?: RequestInit) =>
        baseApi.get<Product>(`/shop/products/${encodeURIComponent(id)}/`, undefined, init),

    getFilters: (init?: RequestInit) =>
        baseApi.get<ProductFilterOptions>('/shop/products/filters/', undefined, init),
};

export const getProducts = productsApi.getAll;
export const getProductFilters = productsApi.getFilters;
