'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { hydrateCart } from '../../model/cartSlice';
import { selectCartHydrated, selectCartItems } from '../../model/selectors';
import { CART_STORAGE_KEY, readStoredCart, writeStoredCart } from '../../model/storage';

export const CartPersistence: React.FC = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCartItems);
    const hydrated = useAppSelector(selectCartHydrated);

    useEffect(() => {
        dispatch(hydrateCart(readStoredCart()));

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
