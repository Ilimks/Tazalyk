import { createSelector } from '@reduxjs/toolkit';
import { parsePrice } from '@/entities/product';
import type { CartState } from './types';

// Селекторы принимают любое состояние с веткой cart — без импорта RootState из store
type StateWithCart = { cart: CartState };

export const selectCartItems = (state: StateWithCart) => state.cart.items;

export const selectCartHydrated = (state: StateWithCart) => state.cart.hydrated;

// разных товаров в корзине
export const selectCartLinesCount = (state: StateWithCart) => state.cart.items.length;

// штук товара с этим id в корзине (0 — товара нет)
export const selectCartItemQuantity = (state: StateWithCart, id: string) =>
    state.cart.items.find((item) => item.id === id)?.quantity ?? 0;

// всего штук — для значка на кнопке корзины
export const selectCartCount = createSelector([selectCartItems], (items) =>
    items.reduce((sum, item) => sum + item.quantity, 0)
);

// сумма для показа; окончательную считает сервер
export const selectCartTotal = createSelector([selectCartItems], (items) =>
    Math.round(items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0) * 100) / 100
);
