import { productsApi, type Product } from '@/entities/product';

export const HOME_PRODUCTS_COUNT = 4;

export const loadHomeProducts = async (init?: RequestInit): Promise<Product[]> => {
    const [featured, regular] = await Promise.all([
        productsApi.getAll({ featured: true, page_size: HOME_PRODUCTS_COUNT }, init),
        productsApi.getAll({ page_size: HOME_PRODUCTS_COUNT * 2 }, init),
    ]);

    const products = featured.results.slice(0, HOME_PRODUCTS_COUNT);
    for (const product of regular.results) {
        if (products.length >= HOME_PRODUCTS_COUNT) break;
        if (!products.some(({ id }) => id === product.id)) products.push(product);
    }
    return products;
};
