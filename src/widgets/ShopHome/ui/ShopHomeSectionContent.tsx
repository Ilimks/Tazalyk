'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { HomeSectionHeader } from '@/shared/ui/HomeSectionHeader';
import { EmptyState } from '@/shared/ui/EmptyState';
import { ErrorState } from '@/shared/ui/ErrorState';
import { LoadingState } from '@/shared/ui/LoadingState';
import { ProductCard, type Product } from '@/entities/product';
import { AddToCartButton } from '@/features/cart';
import { loadHomeProducts } from '../model/loadHomeProducts';
import styles from './ShopHomeSection.module.scss';

interface ShopHomeSectionContentProps {
    // товары с сервера; null — сервер не смог их загрузить, грузим в браузере
    initialProducts: Product[] | null;
}

type LoadError = 'timeout' | 'connection';

// тайм-аут fetch приходит как AbortError/TimeoutError, остальное считаем проблемой связи
const toLoadError = (error: unknown): LoadError =>
    error instanceof DOMException && (error.name === 'TimeoutError' || error.name === 'AbortError')
        ? 'timeout'
        : 'connection';

export const ShopHomeSectionContent: React.FC<ShopHomeSectionContentProps> = ({ initialProducts }) => {
    const t = useTranslations('Shop');
    const tErrors = useTranslations('LoadErrors');
    const [products, setProducts] = useState<Product[] | null>(initialProducts);
    const [error, setError] = useState<LoadError | null>(null);
    const [isLoading, setIsLoading] = useState(initialProducts === null);
    const hasLoadedRef = useRef(false);

    const load = useCallback(() => {
        setIsLoading(true);
        setError(null);
        loadHomeProducts()
            .then(setProducts)
            .catch((loadError) => {
                console.error('Failed to load shop products:', loadError);
                setError(toLoadError(loadError));
            })
            .finally(() => setIsLoading(false));
    }, []);

    // сервер не дождался API — догружаем в браузере один раз
    useEffect(() => {
        if (initialProducts === null && !hasLoadedRef.current) {
            hasLoadedRef.current = true;
            load();
        }
    }, [initialProducts, load]);

    // как в остальных разделах главной: загрузка, ошибка с повтором или заглушка «товаров пока нет»
    const renderBody = () => {
        if (isLoading && !products?.length) return <LoadingState />;

        if (error && !products?.length) {
            return (
                <ErrorState
                    title={error === 'timeout' ? tErrors('timeoutTitle') : tErrors('connectionTitle')}
                    error={error === 'timeout' ? tErrors('timeoutMessage') : tErrors('shop.connectionMessage')}
                    onRetry={load}
                    variant="compact"
                />
            );
        }

        if (!products?.length) return <EmptyState variant="shop" />;

        return (
            <div className={styles.shopHome__grid}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} action={<AddToCartButton product={product} />} />
                ))}
            </div>
        );
    };

    return (
        <section className={styles.shopHome} aria-labelledby="shop-home-title">
            <div className="container">
                <div className={styles.shopHome__box}>
                    <HomeSectionHeader
                        title={t('homeTitle')}
                        buttonText={t('homeButton')}
                        buttonLink="/shop"
                        titleId="shop-home-title"
                    />
                    {renderBody()}
                </div>
            </div>
        </section>
    );
};
