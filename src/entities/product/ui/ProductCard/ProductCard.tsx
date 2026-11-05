'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Container } from 'lucide-react';
import type { Product } from '../../model/types';
import { isProductMaterial } from '../../model/constants';
import { getProductName } from '../../lib/localize';
import { formatMoney, getProductImageUrl } from '../../lib/format';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
    product: Product;
    // кнопка действия (например, «В корзину» из features/cart) — карточка о корзине не знает
    action?: ReactNode;
    className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, action, className = '' }) => {
    const locale = useLocale();
    const t = useTranslations('Shop');
    const imageRef = useRef<HTMLImageElement>(null);
    const [imageFailed, setImageFailed] = useState(false);

    const name = getProductName(product, locale);
    const imageUrl = getProductImageUrl(product);
    const material = isProductMaterial(product.material)
        ? t(`materials.${product.material}`)
        : product.material_label;

    // ошибка загрузки могла случиться до гидратации, когда onError ещё не был подключён
    useEffect(() => {
        const image = imageRef.current;
        if (image && image.complete && image.naturalWidth === 0) setImageFailed(true);
    }, [imageUrl]);

    return (
        <article className={`${styles.card} ${className}`}>
            <div className={styles.media}>
                {imageUrl && !imageFailed ? (
                    // eslint-disable-next-line @next/next/no-img-element -- next/image не используем: фото с API без оптимизатора
                    <img
                        ref={imageRef}
                        className={styles.image}
                        src={imageUrl}
                        alt={name}
                        width={400}
                        height={400}
                        loading="lazy"
                        decoding="async"
                        onError={() => setImageFailed(true)}
                    />
                ) : (
                    <div className={styles.placeholder} aria-hidden="true">
                        <Container strokeWidth={1.25} />
                    </div>
                )}
                <span className={`${styles.stock} ${product.in_stock ? styles.stockIn : styles.stockOut}`}>
                    {product.in_stock ? t('inStock') : t('outOfStock')}
                </span>
            </div>

            <div className={styles.body}>
                <div className={styles.specs}>
                    <span className={styles.spec}>{t('volume', { volume: product.volume })}</span>
                    <span className={styles.spec}>{material}</span>
                </div>
                <h3 className={styles.title} title={name}>{name}</h3>
                <p className={styles.price}>{t('price', { price: formatMoney(product.price) })}</p>
                {action && <div className={styles.action}>{action}</div>}
            </div>
        </article>
    );
};
