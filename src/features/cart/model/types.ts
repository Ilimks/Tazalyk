export interface CartItem {
    id: string;
    name_ru: string;
    name_ky: string;
    volume: number;
    material: string;
    price: string;
    image: string | null;
    quantity: number;
}

export type CartItemDetails = Omit<CartItem, 'quantity'>;

export interface CartState {
    items: CartItem[];
    hydrated: boolean;
}
