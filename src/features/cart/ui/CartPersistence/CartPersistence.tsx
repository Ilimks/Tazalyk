'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { hydrateCart } from '../../model/cartSlice';
import { selectCartHydrated, selectCartItems } from '../../model/selectors';
import { CART_STORAGE_KEY, readStoredCart, writeStoredCart } from '../../model/storage';

// Связывает корзину в Redux с localStorage. Ничего не рисует.
// Читаем хранилище только после монтирования: на сервере и при гидратации корзина пустая,
// поэтому разметка сервера и браузера совпадает
export const CartPersistence: React.FC = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCartItems);
    const hydrated = useAppSelector(selectCartHydrated);

    useEffect(() => {
        dispatch(hydrateCart(readStoredCart()));

        // корзину поменяли в другой вкладке
        const handleStorage = (event: StorageEvent) => {
            if (event.key === CART_STORAGE_KEY || event.key === null) {
                dispatch(hydrateCart(readStoredCart()));
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [dispatch]);

    useEffect(() => {
        if (hydrated) writeStoredCart(items);
    }, [hydrated, items]);

    return null;
};
