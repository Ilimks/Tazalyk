import { getProductsServerFetchOptions, type Product } from '@/entities/product';
import { loadHomeProducts } from '../model/loadHomeProducts';
import { ShopHomeSectionContent } from './ShopHomeSectionContent';

const prefetchHomeProducts = async (): Promise<Product[] | null> => {
    try {
        return await loadHomeProducts(getProductsServerFetchOptions());
    } catch (error) {
        console.error('Failed to prefetch shop products:', error);
        return null;
    }
};

export const ShopHomeSection = async () => {
    const products = await prefetchHomeProducts();

    return <ShopHomeSectionContent initialProducts={products} />;
};
