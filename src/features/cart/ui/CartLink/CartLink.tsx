'use client';
import { useTranslations } from 'next-intl';
import { ShoppingCart } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectCartCount, selectCartHydrated } from '../../model/selectors';
import styles from './CartLink.module.scss';

interface CartLinkProps {
    className?: string;
}

// Кнопка корзины в шапке. Счётчик появляется только после чтения корзины из localStorage,
// поэтому серверная разметка и первая отрисовка в браузере совпадают
export const CartLink: React.FC<CartLinkProps> = ({ className = '' }) => {
    const t = useTranslations('Cart');
    const hydrated = useAppSelector(selectCartHydrated);
    const count = useAppSelector(selectCartCount);
    const showBadge = hydrated && count > 0;

    return (
        <Link
            href="/cart"
            className={`${styles.link} ${className}`}
            aria-label={showBadge ? t('linkWithCount', { count }) : t('link')}
            title={t('link')}
        >
            <ShoppingCart aria-hidden />
            {showBadge && (
                <span className={styles.badge} aria-hidden="true">
                    {count > 99 ? '99+' : count}
                </span>
            )}
        </Link>
    );
};
