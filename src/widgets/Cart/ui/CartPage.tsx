'use client';
import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, CircleCheck, RefreshCw, ShoppingCart, TriangleAlert } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { PageHeader } from '@/shared/ui/PageHeader';
import { EmptyState } from '@/shared/ui/EmptyState';
import buttonStyles from '@/shared/ui/Buttons/Button/Button.module.scss';
import { formatMoney, getProductName } from '@/entities/product';
import type { OrderCreated } from '@/entities/order';
import { useCart, useCartRefresh } from '@/features/cart';
import { CheckoutForm } from '@/features/checkout';
import { CartItemRow } from './CartItemRow/CartItemRow';
import { OrderSuccess } from './OrderSuccess/OrderSuccess';
import styles from './CartPage.module.scss';

type Notice = { type: 'success' | 'error'; text: string };

export const CartPage: React.FC = () => {
    const t = useTranslations('Cart');
    const tShop = useTranslations('Shop');
    const locale = useLocale();
    const { items, hydrated, count, total, increment, decrement, setQuantity, remove, clear } = useCart();
    const { refresh, isRefreshing } = useCartRefresh();
    const [order, setOrder] = useState<OrderCreated | null>(null);
    const [itemsError, setItemsError] = useState<string[] | null>(null);
    const [notice, setNotice] = useState<Notice | null>(null);

    const lines = useMemo(
        () => items.map((item) => ({ product: item.id, quantity: item.quantity })),
        [items]
    );

    // корзину поменяли — старое сообщение о недоступных товарах уже не актуально
    useEffect(() => {
        setItemsError(null);
    }, [items]);

    const handleRefresh = async () => {
        setNotice(null);
        try {
            const { removed } = await refresh();
            setItemsError(null);
            setNotice({
                type: 'success',
                text: removed.length
                    ? t('refreshedRemoved', { names: removed.map((item) => getProductName(item, locale)).join(', ') })
                    : t('refreshed'),
            });
        } catch {
            setNotice({ type: 'error', text: t('refreshFailed') });
        }
    };

    const handleClear = () => {
        if (window.confirm(t('clearConfirm'))) clear();
    };

    const handleSuccess = (created: OrderCreated) => {
        clear();
        setOrder(created);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const header = <PageHeader title={t('title')} description={order ? undefined : t('description')} />;

    if (order) {
        return (
            <div className={styles.cartPage}>
                {header}
                <div className="container">
                    <OrderSuccess order={order} />
                </div>
            </div>
        );
    }

    // до чтения localStorage (и на сервере) показываем заглушку, а не «корзина пуста»
    if (!hydrated) {
        return (
            <div className={styles.cartPage}>
                {header}
                <div className="container">
                    <div className={styles.skeleton} aria-hidden="true">
                        <div className={styles.skeletonCard} />
                        <div className={styles.skeletonCard} />
                    </div>
                </div>
            </div>
        );
    }

    const noticeBlock = notice && (
        <div
            className={`${styles.notice} ${notice.type === 'error' ? styles.noticeError : styles.noticeSuccess}`}
            role="status"
        >
            {notice.type === 'error' ? <TriangleAlert aria-hidden /> : <CircleCheck aria-hidden />}
            <span>{notice.text}</span>
        </div>
    );

    if (items.length === 0) {
        return (
            <div className={styles.cartPage}>
                {header}
                <div className="container">
                    {noticeBlock}
                    <EmptyState icon={ShoppingCart} title={t('emptyTitle')} description={t('emptyDescription')}>
                        <Link href="/shop" className={`${buttonStyles.button} ${styles.emptyLink}`}>
                            {t('goToShop')}
                        </Link>
                    </EmptyState>
                </div>
            </div>
        );
    }

    const totalText = tShop('price', { price: formatMoney(total) });

    return (
        <div className={styles.cartPage}>
            {header}
            <div className="container">
                <div className={styles.layout}>
                    <div className={styles.itemsColumn}>
                        {itemsError && (
                            <div className={styles.alert} role="alert">
                                <TriangleAlert className={styles.alertIcon} aria-hidden />
                                <div className={styles.alertBody}>
                                    {itemsError.map((message) => (
                                        <p key={message} className={styles.alertText}>{message}</p>
                                    ))}
                                    <button
                                        type="button"
                                        className={styles.alertButton}
                                        onClick={handleRefresh}
                                        disabled={isRefreshing}
                                    >
                                        <RefreshCw className={isRefreshing ? styles.spin : undefined} aria-hidden />
                                        {isRefreshing ? t('refreshing') : t('refresh')}
                                    </button>
                                </div>
                            </div>
                        )}
                        {noticeBlock}

                        <section className={styles.card} aria-labelledby="cart-items-title">
                            <div className={styles.cardHeader}>
                                <h2 id="cart-items-title" className={styles.cardTitle}>
                                    {t('itemsTitle')}
                                    <span className={styles.cardCount}>{t('itemsCount', { count })}</span>
                                </h2>
                                <button type="button" className={styles.clear} onClick={handleClear}>
                                    {t('clear')}
                                </button>
                            </div>

                            <ul className={styles.items}>
                                {items.map((item) => (
                                    <CartItemRow
                                        key={item.id}
                                        item={item}
                                        onIncrement={increment}
                                        onDecrement={decrement}
                                        onSetQuantity={setQuantity}
                                        onRemove={remove}
                                    />
                                ))}
                            </ul>

                            <div className={styles.cardFooter}>
                                <Link href="/shop" className={styles.continue}>
                                    <ArrowLeft aria-hidden />
                                    {t('continueShopping')}
                                </Link>
                                <p className={styles.cardTotal}>
                                    {t('total')} <strong>{totalText}</strong>
                                </p>
                            </div>
                        </section>
                    </div>

                    <div className={styles.checkoutColumn}>
                        <CheckoutForm
                            lines={lines}
                            onSuccess={handleSuccess}
                            onItemsError={setItemsError}
                            summary={
                                <div className={styles.summary}>
                                    <div className={styles.summaryRow}>
                                        <span>{t('itemsCount', { count })}</span>
                                        <span>{totalText}</span>
                                    </div>
                                    <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                                        <span>{t('total')}</span>
                                        <span>{totalText}</span>
                                    </div>
                                    <p className={styles.summaryNote}>{t('totalNote')}</p>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
