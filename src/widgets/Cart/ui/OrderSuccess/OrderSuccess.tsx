'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { CircleCheckBig, MessageCircle, Phone, Send } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { formatMoney } from '@/entities/product';
import { getSafeTelegramUrl, getSafeWhatsAppUrl, type OrderCreated } from '@/entities/order';
import styles from './OrderSuccess.module.scss';

interface OrderSuccessProps {
    order: OrderCreated;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({ order }) => {
    const t = useTranslations('Cart.success');
    const tShop = useTranslations('Shop');
    const titleRef = useRef<HTMLHeadingElement>(null);
    const orderNumber = Number.isFinite(Number(order.number)) ? String(order.number) : '';

    // ссылки из ответа API — только если это https-ссылки на сам мессенджер
    const contacts = [
        {
            method: 'whatsapp',
            url: getSafeWhatsAppUrl(order.whatsapp_url),
            label: t('writeWhatsApp'),
            icon: MessageCircle,
            className: styles.whatsapp,
        },
        {
            method: 'telegram',
            url: getSafeTelegramUrl(order.telegram_url),
            label: t('writeTelegram'),
            icon: Send,
            className: styles.telegram,
        },
    ]
        .filter((contact) => contact.url)
        // первым идёт мессенджер, который покупатель выбрал в форме
        .sort((a, b) => Number(b.method === order.contact_method) - Number(a.method === order.contact_method));

    // экранный диктор сразу прочитает, что заказ оформлен
    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    return (
        <section className={styles.success} aria-labelledby="order-success-title">
            <div className={styles.icon} aria-hidden="true">
                <CircleCheckBig />
            </div>
            <h2 id="order-success-title" ref={titleRef} tabIndex={-1} className={styles.title}>
                {t('title', { number: orderNumber })}
            </h2>
            <p className={styles.total}>
                {t('total')}{' '}
                <strong>{tShop('price', { price: formatMoney(order.total) })}</strong>
            </p>

            {contacts.length > 0 ? (
                <>
                    <p className={styles.step}>{t('writeStep')}</p>
                    <div className={styles.contacts}>
                        {contacts.map(({ method, url, label, icon: Icon, className }) => (
                            <a
                                key={method}
                                href={url as string}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.payButton} ${className}`}
                            >
                                <Icon aria-hidden />
                                <span>{label}</span>
                                <span className={styles.srOnly}>{t('newTab')}</span>
                            </a>
                        ))}
                    </div>
                    <p className={styles.hint}>{t('writeHint')}</p>
                </>
            ) : (
                <p className={styles.callNote}>
                    <Phone aria-hidden />
                    <span>{t('managerWillCall')}</span>
                </p>
            )}

            <Link href="/shop" className={styles.back}>
                {t('backToShop')}
            </Link>
        </section>
    );
};
