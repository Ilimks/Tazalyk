export {
    cartReducer,
    hydrateCart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    setQuantity,
    removeFromCart,
    clearCart,
    syncCartItems,
    clampQuantity,
} from './model/cartSlice';
export {
    selectCartItems,
    selectCartHydrated,
    selectCartLinesCount,
    selectCartItemQuantity,
    selectCartCount,
    selectCartTotal,
} from './model/selectors';
export { toCartItem, toCartItemDetails } from './model/toCartItem';
export { useCart } from './model/useCart';
export { useCartRefresh } from './model/useCartRefresh';
export { CART_STORAGE_KEY } from './model/storage';

export { CartPersistence } from './ui/CartPersistence/CartPersistence';
export { AddToCartButton } from './ui/AddToCartButton/AddToCartButton';
export { QuantityStepper } from './ui/QuantityStepper/QuantityStepper';
export { CartLink } from './ui/CartLink/CartLink';

export type { CartItem, CartItemDetails, CartState } from './model/types';
export type { CartRefreshResult } from './model/useCartRefresh';
