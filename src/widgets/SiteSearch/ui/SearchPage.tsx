'use client';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { LoadingState } from '@/shared/ui/LoadingState';
import { PageHeader } from '@/shared/ui/PageHeader';
import { SEARCH_HIT_TYPES, useSiteSearch } from '@/features/site-search';
import styles from './SearchPage.module.scss';

// по столько записей запрашиваем в каждом разделе (максимум сервера)
const PAGE_API_LIMIT = 20;

interface SearchPageProps {
    initialQuery: string;
}

export const SearchPage: React.FC<SearchPageProps> = ({ initialQuery }) => {
    const t = useTranslations('Search');
    const { query, setQuery, hits, hasQuery, isLoading, isEmpty, goToResults } = useSiteSearch({
        initialQuery,
        apiLimit: PAGE_API_LIMIT,
    });

    const groups = useMemo(
        () =>
            SEARCH_HIT_TYPES.map((type) => ({ type, items: hits.filter((hit) => hit.type === type) })).filter(
                (group) => group.items.length > 0
            ),
        [hits]
    );

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        goToResults();
    };

    return (
        <div className={styles.page}>
            <PageHeader title={t('title')} description={t('description')} />

            <div className="container">
                <form className={styles.form} onSubmit={handleSubmit} role="search">
                    <input
                        className={styles.input}
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={t('placeholder')}
                        aria-label={t('placeholder')}
                        autoComplete="off"
                        autoFocus={!initialQuery}
                    />
                    <button className={styles.button} type="submit">
                        <Search aria-hidden size={18} />
                        <span>{t('button')}</span>
                    </button>
                </form>

                {!hasQuery && <p className={styles.notice}>{t('hintStart')}</p>}
                {hasQuery && hits.length === 0 && isLoading && <LoadingState />}
                {isEmpty && (
                    <p className={styles.notice}>
                        <strong>{t('nothing')}</strong>
                        <span>{t('nothingHint')}</span>
                    </p>
                )}

                {hits.length > 0 && (
                    <>
                        <p className={styles.count}>{t('found', { count: hits.length })}</p>
                        {groups.map(({ type, items }) => (
                            <section key={type} className={styles.group}>
                                <h2 className={styles.groupTitle}>{t(`types.${type}`)}</h2>
                                <ul className={styles.list}>
                                    {items.map((hit) => (
                                        <li key={hit.key}>
                                            <Link href={hit.url} className={styles.item}>
                                                <span className={styles.itemTitle}>{hit.title}</span>
                                                {hit.snippet && <span className={styles.snippet}>{hit.snippet}</span>}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};
