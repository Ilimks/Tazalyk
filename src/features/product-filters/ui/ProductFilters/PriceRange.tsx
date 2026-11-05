'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './ProductFilters.module.scss';

interface PriceRangeProps {
    id: string;
    min: number | null;
    max: number | null;
    placeholderMin?: string;
    placeholderMax?: string;
    // 0 — сразу (в выдвижной панели), иначе после паузы в наборе
    debounceMs: number;
    onChange: (min: number | null, max: number | null) => void;
}

const toText = (value: number | null) => (value === null ? '' : String(value));
const toNumber = (text: string): number | null => (text === '' ? null : Number(text));
// только цифры, не больше 10 знаков
const cleanInput = (value: string) => value.replace(/\D/g, '').replace(/^0+(?=\d)/, '').slice(0, 10);

export const PriceRange: React.FC<PriceRangeProps> = ({
    id,
    min,
    max,
    placeholderMin,
    placeholderMax,
    debounceMs,
    onChange,
}) => {
    const t = useTranslations('Shop.filters');
    const [from, setFrom] = useState(toText(min));
    const [to, setTo] = useState(toText(max));
    const timerRef = useRef<number | null>(null);
    const latestRef = useRef({ from, to });
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    // значения поменялись снаружи (сброс фильтров, «Назад») — показываем их, если пользователь сейчас не печатает
    useEffect(() => {
        if (timerRef.current === null) {
            setFrom(toText(min));
            latestRef.current.from = toText(min);
        }
    }, [min]);

    useEffect(() => {
        if (timerRef.current === null) {
            setTo(toText(max));
            latestRef.current.to = toText(max);
        }
    }, [max]);

    useEffect(() => () => {
        if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    }, []);

    const flush = () => {
        if (timerRef.current !== null) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        const { from: nextFrom, to: nextTo } = latestRef.current;
        onChangeRef.current(toNumber(nextFrom), toNumber(nextTo));
    };

    const update = (nextFrom: string, nextTo: string) => {
        latestRef.current = { from: nextFrom, to: nextTo };
        if (debounceMs <= 0) {
            flush();
            return;
        }
        if (timerRef.current !== null) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(flush, debounceMs);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            flush();
        }
    };

    // по уходу из поля применяем сразу, не дожидаясь паузы
    const handleBlur = () => {
        if (timerRef.current !== null) flush();
    };

    return (
        <div className={styles.priceRange}>
            <label className={styles.priceField} htmlFor={`${id}-min`}>
                <span className={styles.priceLabel}>{t('priceFrom')}</span>
                <input
                    id={`${id}-min`}
                    className={styles.priceInput}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={from}
                    placeholder={placeholderMin}
                    aria-label={t('priceFromAria')}
                    onChange={(event) => {
                        const value = cleanInput(event.target.value);
                        setFrom(value);
                        update(value, latestRef.current.to);
                    }}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                />
            </label>
            <span className={styles.priceDash} aria-hidden="true">—</span>
            <label className={styles.priceField} htmlFor={`${id}-max`}>
                <span className={styles.priceLabel}>{t('priceTo')}</span>
                <input
                    id={`${id}-max`}
                    className={styles.priceInput}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={to}
                    placeholder={placeholderMax}
                    aria-label={t('priceToAria')}
                    onChange={(event) => {
                        const value = cleanInput(event.target.value);
                        setTo(value);
                        update(latestRef.current.from, value);
                    }}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                />
            </label>
        </div>
    );
};
