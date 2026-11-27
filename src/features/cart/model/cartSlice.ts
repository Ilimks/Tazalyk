import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ORDER_RULES } from '@/entities/order';
import type { CartItem, CartItemDetails, CartState } from './types';

const initialState: CartState = {
    items: [],
    hydrated: false,
};

export const clampQuantity = (quantity: number): number => {
    if (!Number.isFinite(quantity)) return ORDER_RULES.minQuantity;
    return Math.min(ORDER_RULES.maxQuantity, Math.max(ORDER_RULES.minQuantity, Math.trunc(quantity)));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
            const items = action.payload.map((item) => ({ ...item }));
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
            if (state.items.length >= ORDER_RULES.maxLines) return;
            state.items.push({ ...action.payload, quantity: clampQuantity(action.payload.quantity) });
        },

        incrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(({ id }) => id === action.payload);
            if (item) item.quantity = clampQuantity(item.quantity + 1);
        },

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

        syncCartItems: (
            state,
            action: PayloadAction<{ updates?: CartItemDetails[]; removeIds?: string[] }>
        ) => {
            const { updates = [], removeIds = [] } = action.payload;
            if (removeIds.length) {
                state.items = state.items.filter(({ id }) => !removeIds.includes(id));
            }
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
