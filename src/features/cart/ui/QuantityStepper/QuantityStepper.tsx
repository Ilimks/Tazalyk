'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Minus, Plus } from 'lucide-react';
import { ORDER_RULES } from '@/entities/order';
import styles from './QuantityStepper.module.scss';

interface QuantityStepperProps {
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
    // если передан — число можно ввести с клавиатуры (сохраняется при уходе из поля или по Enter)
    onChange?: (value: number) => void;
    // «−» неактивна, когда value <= min; при min = 0 «−» на единице убирает товар из корзины
    min?: number;
    max?: number;
    // название товара для экранных дикторов
    label?: string;
    size?: 'md' | 'sm';
    className?: string;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
    value,
    onIncrement,
    onDecrement,
    onChange,
    min = 0,
    max = ORDER_RULES.maxQuantity,
    label,
    size = 'md',
    className = '',
}) => {
    const t = useTranslations('Cart');
    const [text, setText] = useState(String(value));

    useEffect(() => {
        setText(String(value));
    }, [value]);

    const commit = () => {
        if (!onChange) return;
        const parsed = Number.parseInt(text, 10);
        if (!Number.isFinite(parsed)) {
            setText(String(value));
            return;
        }
        const next = Math.min(max, Math.max(Math.max(min, ORDER_RULES.minQuantity), parsed));
        setText(String(next));
        if (next !== value) onChange(next);
    };

    return (
        <div
            className={`${styles.stepper} ${size === 'sm' ? styles.small : ''} ${className}`}
            role="group"
            aria-label={label ? t('quantityOf', { name: label }) : t('quantity')}
        >
            <button
                type="button"
                className={styles.button}
                onClick={onDecrement}
                disabled={value <= min}
                aria-label={t('decrease')}
            >
                <Minus aria-hidden />
            </button>

            {onChange ? (
                <input
                    className={styles.input}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={3}
                    value={text}
                    aria-label={t('quantity')}
                    onChange={(event) => setText(event.target.value.replace(/\D/g, ''))}
                    onBlur={commit}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                            commit();
                        }
                    }}
                />
            ) : (
                <span className={styles.value} aria-live="polite">
                    {value}
                </span>
            )}

            <button
                type="button"
                className={styles.button}
                onClick={onIncrement}
                disabled={value >= max}
                aria-label={t('increase')}
            >
                <Plus aria-hidden />
            </button>
        </div>
    );
};
