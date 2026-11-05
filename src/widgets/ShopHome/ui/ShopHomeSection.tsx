import { getProductsServerFetchOptions, type Product } from '@/entities/product';
import { loadHomeProducts } from '../model/loadHomeProducts';
import { ShopHomeSectionContent } from './ShopHomeSectionContent';

// Товары загружаются на сервере, чтобы сразу попасть в HTML главной страницы
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

    // null — сервер не дождался API, товары загрузятся в браузере.
    // Пустой список тоже показываем: раздел остаётся на месте с заглушкой «Товаров пока нет»
    return <ShopHomeSectionContent initialProducts={products} />;
};
