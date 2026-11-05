'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import type { ProductFilterOptions } from '@/entities/product';
import {
    ProductFilters,
    countActiveFilters,
    resetShopFilters,
    type ShopQuery,
} from '@/features/product-filters';
import styles from './FiltersDrawer.module.scss';

interface FiltersDrawerProps {
    // фильтры на момент открытия; изменения копятся в черновике до «Применить»
    initialQuery: ShopQuery;
    options: ProductFilterOptions | null;
    onApply: (query: ShopQuery) => void;
    onClose: () => void;
}

// Выдвижная панель фильтров для телефонов и планшетов. Монтируется только открытой
export const FiltersDrawer: React.FC<FiltersDrawerProps> = ({ initialQuery, options, onApply, onClose }) => {
    const t = useTranslations('Shop.filters');
    const titleId = useId();
    const [draft, setDraft] = useState<ShopQuery>(initialQuery);
    const panelRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement | null;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onCloseRef.current();
                return;
            }
            // фокус не уходит из панели по Tab
            if (event.key === 'Tab' && panelRef.current) {
                const focusable = panelRef.current.querySelectorAll<HTMLElement>(
                    'button:not([disabled]), input:not([disabled]), select:not([disabled]), [href]'
                );
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
            previouslyFocused?.focus?.();
        };
    }, []);

    const hasFilters = countActiveFilters(draft) > 0;

    return (
        <div className={styles.root}>
            <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
            <div
                ref={panelRef}
                className={styles.panel}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
            >
                <div className={styles.header}>
                    <h2 id={titleId} className={styles.title}>{t('title')}</h2>
                    <button
                        ref={closeRef}
                        type="button"
                        className={styles.close}
                        onClick={onClose}
                        aria-label={t('close')}
                    >
                        <X aria-hidden />
                    </button>
                </div>

                <div className={styles.body}>
                    <ProductFilters value={draft} onChange={setDraft} options={options} priceDebounceMs={0} />
                </div>

                <div className={styles.footer}>
                    <button
                        type="button"
                        className={styles.reset}
                        onClick={() => setDraft(resetShopFilters(draft))}
                        disabled={!hasFilters}
                    >
                        {t('reset')}
                    </button>
                    <button type="button" className={styles.apply} onClick={() => onApply(draft)}>
                        {t('apply')}
                    </button>
                </div>
            </div>
        </div>
    );
};
