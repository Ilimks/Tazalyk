import type { ProductMaterial, ProductOrdering } from './types';

export const PRODUCT_MATERIALS: readonly ProductMaterial[] = ['plastic', 'metal', 'galvanized'];

export const PRODUCT_ORDERINGS: readonly ProductOrdering[] = ['price', '-price', 'volume', '-volume', 'new'];

export const PRODUCTS_PAGE_SIZE = 12;

export const isProductMaterial = (value: unknown): value is ProductMaterial =>
    typeof value === 'string' && (PRODUCT_MATERIALS as readonly string[]).includes(value);

export const isProductOrdering = (value: unknown): value is ProductOrdering =>
    typeof value === 'string' && (PRODUCT_ORDERINGS as readonly string[]).includes(value);
