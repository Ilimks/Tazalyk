'use client';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector, useMounted } from '@/shared/lib/hooks';
import {
    clearCart,
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
    setQuantity,
} from './cartSlice';
import {
    selectCartCount,
    selectCartHydrated,
    selectCartItems,
    selectCartTotal,
} from './selectors';

export const useCart = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCartItems);
    const mounted = useMounted();
    const hydrated = useAppSelector(selectCartHydrated) && mounted;
    const count = useAppSelector(selectCartCount);
    const total = useAppSelector(selectCartTotal);

    const actions = useMemo(
        () => ({
            increment: (id: string) => dispatch(incrementQuantity(id)),
            decrement: (id: string) => dispatch(decrementQuantity(id)),
            setQuantity: (id: string, quantity: number) => dispatch(setQuantity({ id, quantity })),
            remove: (id: string) => dispatch(removeFromCart(id)),
            clear: () => dispatch(clearCart()),
        }),
        [dispatch]
    );

    return { items, hydrated, count, total, ...actions };
};
