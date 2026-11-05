'use client';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { ApiError } from '@/shared/api';
import { productsApi, type Product } from '@/entities/product';
import { syncCartItems } from './cartSlice';
import { selectCartItems } from './selectors';
import { toCartItemDetails } from './toCartItem';
import type { CartItem } from './types';

export interface CartRefreshResult {
    // позиции, которые убраны из корзины: товар снят с продажи или закончился
    removed: CartItem[];
}

// «Обновить корзину»: заново берёт каждый товар из каталога, обновляет цены и названия
// и убирает то, что больше нельзя заказать. Ошибка сети пробрасывается вызывающему
export const useCartRefresh = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCartItems);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refresh = useCallback(async (): Promise<CartRefreshResult> => {
        setIsRefreshing(true);
        try {
            const results = await Promise.all(
                items.map(async (item): Promise<{ item: CartItem; product: Product | null }> => {
                    try {
                        return { item, product: await productsApi.getById(item.id) };
                    } catch (error) {
                        // 404 — товар удалён или скрыт
                        if (error instanceof ApiError && error.status === 404) return { item, product: null };
                        throw error;
                    }
                })
            );

            const removed = results
                .filter(({ product }) => !product || !product.in_stock || !product.is_active)
                .map(({ item }) => item);
            const updates = results
                .filter(({ product }) => product && product.in_stock && product.is_active)
                .map(({ product }) => toCartItemDetails(product as Product));

            dispatch(syncCartItems({ updates, removeIds: removed.map(({ id }) => id) }));
            return { removed };
        } finally {
            setIsRefreshing(false);
        }
    }, [dispatch, items]);

    return { refresh, isRefreshing };
};
