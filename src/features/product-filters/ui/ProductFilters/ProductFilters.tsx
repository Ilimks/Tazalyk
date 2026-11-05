'use client';
import { useId, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
    PRODUCT_MATERIALS,
    formatMoney,
    parsePrice,
    type ProductFilterOptions,
    type ProductMaterial,
} from '@/entities/product';
import type { ShopQuery } from '../../model/shopQuery';
import { PriceRange } from './PriceRange';
import styles from './ProductFilters.module.scss';

interface ProductFiltersProps {
    value: ShopQuery;
    onChange: (next: ShopQuery) => void;
    // варианты из /shop/products/filters/; null — ещё не загружены или API недоступен
    options: ProductFilterOptions | null;
    // пауза перед применением цены; 0 — сразу
    priceDebounceMs?: number;
}

const toggle = <T,>(list: readonly T[], item: T): T[] =>
    list.includes(item) ? list.filter((value) => value !== item) : [...list, item];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
    value,
    onChange,
    options,
    priceDebounceMs = 600,
}) => {
    const t = useTranslations('Shop');
    const id = useId();
    // цена применяется с задержкой — берём самые свежие остальные фильтры, а не те, что были при наборе
    const valueRef = useRef(value);
    valueRef.current = value;

    // выбранное в адресе показываем, даже если такого варианта сейчас нет в каталоге, — чтобы его можно было снять
    const volumes = useMemo(
        () => Array.from(new Set([...(options?.volumes ?? []), ...value.volumes])).sort((a, b) => a - b),
        [options, value.volumes]
    );
    const materials = useMemo<ProductMaterial[]>(() => {
        if (!options) return [...PRODUCT_MATERIALS];
        const available = new Set<string>([...options.materials.map((m) => m.value), ...value.materials]);
        return PRODUCT_MATERIALS.filter((material) => available.has(material));
    }, [options, value.materials]);

    const priceMinHint = options?.price.min ? formatMoney(Math.floor(parsePrice(options.price.min))) : undefined;
    const priceMaxHint = options?.price.max ? formatMoney(Math.ceil(parsePrice(options.price.max))) : undefined;

    const handlePriceChange = (priceMin: number | null, priceMax: number | null) => {
        const current = valueRef.current;
        if (current.priceMin === priceMin && current.priceMax === priceMax) return;
        onChange({ ...current, priceMin, priceMax });
    };

    return (
        <div className={styles.filters}>
            {volumes.length > 0 && (
                <fieldset className={styles.group}>
                    <legend className={styles.legend}>{t('filters.volume')}</legend>
                    <div className={styles.options}>
                        {volumes.map((volume) => (
                            <label key={volume} className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={value.volumes.includes(volume)}
                                    onChange={() => onChange({ ...value, volumes: toggle(value.volumes, volume) })}
                                />
                                <span>{t('volume', { volume })}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
            )}

            {materials.length > 0 && (
                <fieldset className={styles.group}>
                    <legend className={styles.legend}>{t('filters.material')}</legend>
                    <div className={styles.options}>
                        {materials.map((material) => (
                            <label key={material} className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={value.materials.includes(material)}
                                    onChange={() =>
                                        onChange({ ...value, materials: toggle(value.materials, material) })
                                    }
                                />
                                <span>{t(`materials.${material}`)}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
            )}

            <fieldset className={styles.group}>
                <legend className={styles.legend}>{t('filters.price')}</legend>
                <PriceRange
                    id={`${id}-price`}
                    min={value.priceMin}
                    max={value.priceMax}
                    placeholderMin={priceMinHint}
                    placeholderMax={priceMaxHint}
                    debounceMs={priceDebounceMs}
                    onChange={handlePriceChange}
                />
            </fieldset>

            <div className={styles.group}>
                <label className={styles.switch}>
                    <input
                        type="checkbox"
                        role="switch"
                        checked={value.inStock}
                        onChange={(event) => onChange({ ...value, inStock: event.target.checked })}
                    />
                    <span className={styles.switchTrack} aria-hidden="true" />
                    <span className={styles.switchLabel}>{t('filters.inStockOnly')}</span>
                </label>
            </div>
        </div>
    );
};
