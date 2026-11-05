export { ProductCard } from './ui/ProductCard/ProductCard';
export { ProductCardSkeleton } from './ui/ProductCardSkeleton/ProductCardSkeleton';
export {
    productsApi,
    getProducts,
    getProductFilters,
    getProductsServerFetchOptions,
    PRODUCTS_REVALIDATE_SECONDS,
} from './api/productsApi';
// только для серверных компонентов
export { prefetchProducts, prefetchProductFilters } from './api/prefetch';
export {
    PRODUCT_MATERIALS,
    PRODUCT_ORDERINGS,
    PRODUCTS_PAGE_SIZE,
    isProductMaterial,
    isProductOrdering,
} from './model/constants';
export { getProductName, getProductDescription } from './lib/localize';
export { formatMoney, parsePrice, getProductImageUrl } from './lib/format';

export type {
    Product,
    ProductMaterial,
    ProductOrdering,
    ProductQuery,
    ProductFilterOptions,
    PaginatedProductsResponse,
} from './model/types';
