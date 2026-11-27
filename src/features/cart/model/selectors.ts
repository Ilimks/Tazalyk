import { createSelector } from '@reduxjs/toolkit';
import { parsePrice } from '@/entities/product';
import type { CartState } from './types';

type StateWithCart = { cart: CartState };

export const selectCartItems = (state: StateWithCart) => state.cart.items;

export const selectCartHydrated = (state: StateWithCart) => state.cart.hydrated;

export const selectCartLinesCount = (state: StateWithCart) => state.cart.items.length;

export const selectCartItemQuantity = (state: StateWithCart, id: string) =>
    state.cart.items.find((item) => item.id === id)?.quantity ?? 0;

export const selectCartCount = createSelector([selectCartItems], (items) =>
    items.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
    Math.round(items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0) * 100) / 100
);
