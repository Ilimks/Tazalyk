'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { SearchHit } from '../model/types';
import styles from './SearchSuggestions.module.scss';

interface SearchSuggestionsProps {
    hits: SearchHit[];
    // сколько всего найдено, в подсказках показана только часть
    total: number;
    isLoading: boolean;
    isEmpty: boolean;
    onResultClick: () => void;
    onShowAll: () => void;
    className?: string;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
    hits,
    total,
    isLoading,
    isEmpty,
    onResultClick,
    onShowAll,
    className = '',
}) => {
    const t = useTranslations('Search');

    return (
        <div className={`${styles.suggestions} ${className}`}>
            {hits.length > 0 && (
                <ul className={styles.list}>
                    {hits.map((hit) => (
                        <li key={hit.key}>
                            <Link href={hit.url} onClick={onResultClick} className={styles.item}>
                                <span className={styles.type}>{t(`types.${hit.type}`)}</span>
                                <span className={styles.title}>{hit.title}</span>
                                {hit.snippet && <span className={styles.snippet}>{hit.snippet}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            {hits.length === 0 && isLoading && <p className={styles.message}>{t('loading')}</p>}
            {isEmpty && (
                <p className={styles.message}>
                    <strong>{t('nothing')}</strong>
                    <span>{t('nothingHint')}</span>
                </p>
            )}

            {total > 0 && (
                <button type="button" className={styles.showAll} onClick={onShowAll}>
                    {t('allResults', { count: total })}
                </button>
            )}
        </div>
    );
};
