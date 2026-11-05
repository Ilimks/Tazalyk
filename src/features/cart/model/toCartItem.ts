import { getProductImageUrl, type Product } from '@/entities/product';
import type { CartItem, CartItemDetails } from './types';

export const toCartItemDetails = (product: Product): CartItemDetails => ({
    id: product.id,
    name_ru: product.name_ru,
    name_ky: product.name_ky || '',
    volume: product.volume,
    material: product.material,
    price: product.price,
    image: getProductImageUrl(product),
});

export const toCartItem = (product: Product, quantity = 1): CartItem => ({
    ...toCartItemDetails(product),
    quantity,
});
