'use client';
import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ShoppingCart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { getProductName, type Product } from '@/entities/product';
import { ORDER_RULES } from '@/entities/order';
import { addToCart, decrementQuantity, incrementQuantity, syncCartItems } from '../../model/cartSlice';
import {
    selectCartHydrated,
    selectCartItemQuantity,
    selectCartLinesCount,
} from '../../model/selectors';
import { toCartItem, toCartItemDetails } from '../../model/toCartItem';
import { QuantityStepper } from '../QuantityStepper/QuantityStepper';
import styles from './AddToCartButton.module.scss';

interface AddToCartButtonProps {
    product: Product;
    className?: string;
}

// «В корзину»; если товар уже в корзине — счётчик −/+ (на «−» с единицы товар убирается)
export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, className = '' }) => {
    const t = useTranslations('Cart');
    const locale = useLocale();
    const dispatch = useAppDispatch();
    const hydrated = useAppSelector(selectCartHydrated);
    const quantity = useAppSelector((state) => selectCartItemQuantity(state, product.id));
    const linesCount = useAppSelector(selectCartLinesCount);
    const name = getProductName(product, locale);
    const inCart = hydrated && quantity > 0;

    // в корзине — цена и название из каталога, а не те, что были при добавлении
    useEffect(() => {
        if (inCart && product.in_stock) {
            dispatch(syncCartItems({ updates: [toCartItemDetails(product)] }));
        }
    }, [dispatch, inCart, product]);

    if (!product.in_stock) {
        return (
            <button type="button" className={`${styles.button} ${className}`} disabled>
                {t('unavailable')}
            </button>
        );
    }

    if (inCart) {
        return (
            <QuantityStepper
                className={className}
                value={quantity}
                min={0}
                label={name}
                onIncrement={() => dispatch(incrementQuantity(product.id))}
                onDecrement={() => dispatch(decrementQuantity(product.id))}
            />
        );
    }

    const limitReached = hydrated && linesCount >= ORDER_RULES.maxLines;

    return (
        <button
            type="button"
            className={`${styles.button} ${className}`}
            onClick={() => dispatch(addToCart(toCartItem(product)))}
            disabled={limitReached}
            title={limitReached ? t('linesLimit', { max: ORDER_RULES.maxLines }) : undefined}
            aria-label={t('addAria', { name })}
        >
            <ShoppingCart aria-hidden />
            <span>{t('add')}</span>
        </button>
    );
};
