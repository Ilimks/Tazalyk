import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { searchApi } from '../api/searchApi';
import { MIN_QUERY_LENGTH } from '../lib/text';
import { loadSearchIndex, searchEntries } from './searchIndex';
import type { SearchHit } from './types';

// запрос к серверу — когда пользователь перестал печатать
const DEBOUNCE_MS = 250;

interface UseSiteSearchOptions {
    initialQuery?: string;
    // сколько результатов показывать; без лимита — все
    limit?: number;
    // сколько записей запрашивать в каждом разделе данных
    apiLimit?: number;
}

export const useSiteSearch = ({ initialQuery = '', limit, apiLimit = 5 }: UseSiteSearchOptions = {}) => {
    const locale = useLocale();
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [query, setQuery] = useState(initialQuery);
    const [pageHits, setPageHits] = useState<SearchHit[]>([]);
    const [dataHits, setDataHits] = useState<SearchHit[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const text = query.trim();
    const hasQuery = text.length >= MIN_QUERY_LENGTH;

    useEffect(() => {
        setPageHits([]);
        setDataHits([]);
        if (!hasQuery) {
            setIsLoading(false);
            setIsOpen(false);
            return;
        }

        let cancelled = false;
        const controller = new AbortController();
        setIsLoading(true);
        setIsOpen(true);

        // тексты страниц ищутся в браузере и появляются сразу
        loadSearchIndex()
            .then((entries) => {
                if (!cancelled) setPageHits(searchEntries(entries, text, locale));
            })
            .catch((error) => console.error('Search index failed to load:', error));

        const timer = setTimeout(async () => {
            try {
                const hits = await searchApi.find(text, apiLimit, locale, controller.signal);
                if (!cancelled) setDataHits(hits);
            } catch (error) {
                // без сервера остаётся поиск по страницам сайта
                if (!cancelled) console.error('Search request failed:', error);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }, DEBOUNCE_MS);

        return () => {
            cancelled = true;
            controller.abort();
            clearTimeout(timer);
        };
    }, [text, hasQuery, locale, apiLimit]);

    // подсказки закрываются по клику мимо и по Esc
    useEffect(() => {
        if (!isOpen) return;

        const handleClick = (event: MouseEvent) => {
            if (!wrapperRef.current?.contains(event.target as Node)) setIsOpen(false);
        };
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKey);
        };
    }, [isOpen]);

    const hits = useMemo(
        () => [...pageHits, ...dataHits].sort((a, b) => b.score - a.score),
        [pageHits, dataHits]
    );

    const clearSearch = () => {
        setQuery('');
        setIsOpen(false);
    };

    const goToResults = () => {
        if (!hasQuery) return;
        setIsOpen(false);
        router.push({ pathname: '/search', query: { q: text } });
    };

    return {
        query,
        setQuery,
        hits,
        visibleHits: limit ? hits.slice(0, limit) : hits,
        hasQuery,
        isLoading,
        isEmpty: hasQuery && !isLoading && hits.length === 0,
        isOpen,
        setIsOpen,
        clearSearch,
        goToResults,
        wrapperRef,
    };
};
