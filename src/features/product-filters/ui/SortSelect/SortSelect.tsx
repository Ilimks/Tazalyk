'use client';
import { useId } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { isProductOrdering, type ProductOrdering } from '@/entities/product';
import styles from './SortSelect.module.scss';

interface SortSelectProps {
    value: ProductOrdering | null;
    onChange: (ordering: ProductOrdering | null) => void;
    className?: string;
}

// '' — порядок менеджера («сначала популярные»)
const SORT_OPTIONS: { value: ProductOrdering | ''; key: string }[] = [
    { value: '', key: 'popular' },
    { value: 'price', key: 'cheap' },
    { value: '-price', key: 'expensive' },
    { value: 'volume', key: 'volume' },
    { value: 'new', key: 'new' },
];

export const SortSelect: React.FC<SortSelectProps> = ({ value, onChange, className = '' }) => {
    const t = useTranslations('Shop.sort');
    const id = useId();
    // «по убыванию объёма» в списке нет — показываем ближайший вариант
    const selected = value === '-volume' ? 'volume' : value ?? '';

    return (
        <div className={`${styles.sort} ${className}`}>
            <label className={styles.label} htmlFor={id}>
                {t('label')}
            </label>
            <div className={styles.control}>
                <select
                    id={id}
                    className={styles.select}
                    value={selected}
                    onChange={(event) => {
                        const next = event.target.value;
                        onChange(isProductOrdering(next) ? next : null);
                    }}
                >
                    {SORT_OPTIONS.map((option) => (
                        <option key={option.key} value={option.value}>
                            {t(option.key)}
                        </option>
                    ))}
                </select>
                <ChevronDown className={styles.icon} aria-hidden />
            </div>
        </div>
    );
};
