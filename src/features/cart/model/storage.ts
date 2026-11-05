import { ORDER_RULES } from '@/entities/order';
import { getSafeHttpUrl } from '@/shared/lib/utils/url';
import type { CartItem } from './types';
import { clampQuantity } from './cartSlice';

// Корзина хранится только в этом браузере; читать её можно лишь после монтирования
export const CART_STORAGE_KEY = 'tazalyk:cart';
const STORAGE_VERSION = 1;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PRICE_RE = /^\d{1,12}(\.\d{1,2})?$/;

const toText = (value: unknown, maxLength: number): string =>
    typeof value === 'string' ? value.slice(0, maxLength) : '';

// данные из localStorage мог изменить кто угодно — берём только то, что похоже на позицию корзины
const sanitizeItem = (raw: unknown): CartItem | null => {
    if (!raw || typeof raw !== 'object') return null;
    const item = raw as Record<string, unknown>;

    const id = typeof item.id === 'string' && UUID_RE.test(item.id) ? item.id : null;
    const nameRu = toText(item.name_ru, 200).trim();
    const volume = Number(item.volume);
    const price = typeof item.price === 'string' && PRICE_RE.test(item.price) ? item.price : null;
    const quantity = Number(item.quantity);

    if (!id || !nameRu || !Number.isFinite(volume) || volume <= 0 || price === null || !Number.isFinite(quantity)) {
        return null;
    }

    return {
        id,
        name_ru: nameRu,
        name_ky: toText(item.name_ky, 200),
        volume: Math.trunc(volume),
        material: toText(item.material, 32),
        price,
        image: getSafeHttpUrl(item.image),
        quantity: clampQuantity(quantity),
    };
};

export const readStoredCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const raw = window.localStorage.getItem(CART_STORAGE_KEY);
        if (!raw) return [];
        const parsed: unknown = JSON.parse(raw);
        const list = parsed && typeof parsed === 'object' ? (parsed as { items?: unknown }).items : null;
        if (!Array.isArray(list)) return [];

        const items: CartItem[] = [];
        list.forEach((entry) => {
            const item = sanitizeItem(entry);
            if (item && items.length < ORDER_RULES.maxLines && !items.some(({ id }) => id === item.id)) {
                items.push(item);
            }
        });
        return items;
    } catch {
        // приватный режим, запрет на хранилище или испорченные данные — начинаем с пустой корзины
        return [];
    }
};

export const writeStoredCart = (items: CartItem[]): void => {
    if (typeof window === 'undefined') return;
    try {
        if (items.length === 0) {
            window.localStorage.removeItem(CART_STORAGE_KEY);
            return;
        }
        const value = JSON.stringify({ v: STORAGE_VERSION, items });
        // одинаковое значение не записываем — иначе вкладки будут будить друг друга событием storage
        if (window.localStorage.getItem(CART_STORAGE_KEY) !== value) {
            window.localStorage.setItem(CART_STORAGE_KEY, value);
        }
    } catch {
        // хранилище переполнено или недоступно — корзина работает до закрытия вкладки
    }
};
