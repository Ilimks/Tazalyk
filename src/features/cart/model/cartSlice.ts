import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ORDER_RULES } from '@/entities/order';
import type { CartItem, CartItemDetails, CartState } from './types';

const initialState: CartState = {
    items: [],
    hydrated: false,
};

// количество одного товара: целое от 1 до 100, как на сервере
export const clampQuantity = (quantity: number): number => {
    if (!Number.isFinite(quantity)) return ORDER_RULES.minQuantity;
    return Math.min(ORDER_RULES.maxQuantity, Math.max(ORDER_RULES.minQuantity, Math.trunc(quantity)));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // корзина из localStorage: при загрузке страницы и при изменении в другой вкладке
        hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
            const items = action.payload.map((item) => ({ ...item }));
            // то, что успели положить в корзину до чтения localStorage, не теряем
            if (!state.hydrated) {
                state.items.forEach((added) => {
                    const stored = items.find((item) => item.id === added.id);
                    if (stored) {
                        stored.quantity = clampQuantity(stored.quantity + added.quantity);
                    } else if (items.length < ORDER_RULES.maxLines) {
                        items.push(added);
                    }
                });
            }
            state.items = items;
            state.hydrated = true;
        },

        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existing = state.items.find((item) => item.id === action.payload.id);
            if (existing) {
                existing.quantity = clampQuantity(existing.quantity + action.payload.quantity);
                return;
            }
            // в заказе не больше 20 разных товаров
            if (state.items.length >= ORDER_RULES.maxLines) return;
            state.items.push({ ...action.payload, quantity: clampQuantity(action.payload.quantity) });
        },

        incrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(({ id }) => id === action.payload);
            if (item) item.quantity = clampQuantity(item.quantity + 1);
        },

        // с 1 до 0 — товар убирается из корзины
        decrementQuantity: (state, action: PayloadAction<string>) => {
            const index = state.items.findIndex(({ id }) => id === action.payload);
            if (index === -1) return;
            if (state.items[index].quantity <= ORDER_RULES.minQuantity) {
                state.items.splice(index, 1);
            } else {
                state.items[index].quantity -= 1;
            }
        },

        setQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.items.find(({ id }) => id === action.payload.id);
            if (item) item.quantity = clampQuantity(action.payload.quantity);
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(({ id }) => id !== action.payload);
        },

        clearCart: (state) => {
            state.items = [];
        },

        // свежие название, цена и фото из каталога; removeIds — товары, которые больше нельзя заказать
        syncCartItems: (
            state,
            action: PayloadAction<{ updates?: CartItemDetails[]; removeIds?: string[] }>
        ) => {
            const { updates = [], removeIds = [] } = action.payload;
            if (removeIds.length) {
                state.items = state.items.filter(({ id }) => !removeIds.includes(id));
            }
            // Immer не меняет состояние, если присвоено то же значение
            updates.forEach((details) => {
                const item = state.items.find(({ id }) => id === details.id);
                if (!item) return;
                item.name_ru = details.name_ru;
                item.name_ky = details.name_ky;
                item.volume = details.volume;
                item.material = details.material;
                item.price = details.price;
                item.image = details.image;
            });
        },
    },
});

export const {
    hydrateCart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    setQuantity,
    removeFromCart,
    clearCart,
    syncCartItems,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
