// Позиция корзины: копия нужных полей товара на момент добавления.
// Цена здесь только для показа — сумму заказа считает сервер
export interface CartItem {
    id: string;
    name_ru: string;
    name_ky: string;
    volume: number;
    // 'plastic' | 'metal' | 'galvanized'; строка, чтобы старая корзина не ломалась при новых материалах
    material: string;
    // десятичное число строкой, как в API: "3500.00"
    price: string;
    image: string | null;
    quantity: number;
}

export type CartItemDetails = Omit<CartItem, 'quantity'>;

export interface CartState {
    items: CartItem[];
    // false, пока корзина не прочитана из localStorage (на сервере и до монтирования в браузере)
    hydrated: boolean;
}
