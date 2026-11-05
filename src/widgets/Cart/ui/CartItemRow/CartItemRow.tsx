'use client';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Container, Trash2 } from 'lucide-react';
import {
    formatMoney,
    getProductImageUrl,
    getProductName,
    isProductMaterial,
    parsePrice,
} from '@/entities/product';
import { QuantityStepper, type CartItem } from '@/features/cart';
import styles from './CartItemRow.module.scss';

interface CartItemRowProps {
    item: CartItem;
    onIncrement: (id: string) => void;
    onDecrement: (id: string) => void;
    onSetQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
    item,
    onIncrement,
    onDecrement,
    onSetQuantity,
    onRemove,
}) => {
    const locale = useLocale();
    const t = useTranslations('Cart');
    const tShop = useTranslations('Shop');
    const [imageFailed, setImageFailed] = useState(false);

    const name = getProductName(item, locale);
    const imageUrl = getProductImageUrl(item);
    const material = isProductMaterial(item.material) ? tShop(`materials.${item.material}`) : item.material;
    const subtotal = parsePrice(item.price) * item.quantity;

    return (
        <li className={styles.row}>
            <div className={styles.thumb}>
                {imageUrl && !imageFailed ? (
                    // eslint-disable-next-line @next/next/no-img-element -- фото с API без оптимизатора next/image
                    <img
                        src={imageUrl}
                        alt=""
                        width={80}
                        height={80}
                        loading="lazy"
                        decoding="async"
                        onError={() => setImageFailed(true)}
                    />
                ) : (
                    <Container aria-hidden strokeWidth={1.25} />
                )}
            </div>

            <div className={styles.info}>
                <p className={styles.name}>{name}</p>
                <p className={styles.meta}>
                    {tShop('volume', { volume: item.volume })}
                    {material && ` · ${material}`}
                </p>
                <p className={styles.unitPrice}>
                    {t('perUnit', { price: tShop('price', { price: formatMoney(item.price) }) })}
                </p>
            </div>

            <QuantityStepper
                className={styles.stepper}
                size="sm"
                value={item.quantity}
                min={1}
                label={name}
                onIncrement={() => onIncrement(item.id)}
                onDecrement={() => onDecrement(item.id)}
                onChange={(quantity) => onSetQuantity(item.id, quantity)}
            />

            <p className={styles.subtotal}>
                <span className={styles.subtotalLabel}>{t('subtotal')}</span>
                {tShop('price', { price: formatMoney(subtotal) })}
            </p>

            <button
                type="button"
                className={styles.remove}
                onClick={() => onRemove(item.id)}
                aria-label={t('removeAria', { name })}
                title={t('remove')}
            >
                <Trash2 aria-hidden />
            </button>
        </li>
    );
};
