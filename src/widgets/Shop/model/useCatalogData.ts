'use client';
import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '@/shared/api';
import {
    productsApi,
    type PaginatedProductsResponse,
    type ProductFilterOptions,
} from '@/entities/product';
import { toProductQuery, type ShopQuery } from '@/features/product-filters';

interface UseCatalogDataParams {
    query: ShopQuery;
    queryKey: string;
    // данные, которые сервер загрузил для адреса dataKey; null — сервер не дождался API
    dataKey: string;
    initialData: PaginatedProductsResponse | null;
}

interface ClientState {
    key: string | null;
    data: PaginatedProductsResponse | null;
    error: boolean;
    outOfRange: boolean;
}

const EMPTY_STATE: ClientState = { key: null, data: null, error: false, outOfRange: false };

// Товары каталога: обычно приходят с сервера вместе со страницей;
// если сервер не смог их загрузить, запрашиваем их из браузера
export const useCatalogData = ({ query, queryKey, dataKey, initialData }: UseCatalogDataParams) => {
    const serverData = initialData && dataKey === queryKey ? initialData : null;
    const loadOnClient = serverData === null;
    const [state, setState] = useState<ClientState>(EMPTY_STATE);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        if (!loadOnClient) return;
        let cancelled = false;
        setState((prev) => (prev.key === queryKey && prev.data ? prev : { ...EMPTY_STATE, key: queryKey }));

        productsApi
            .getAll(toProductQuery(query))
            .then((data) => {
                if (!cancelled) setState({ key: queryKey, data, error: false, outOfRange: false });
            })
            .catch((error) => {
                if (cancelled) return;
                const outOfRange = error instanceof ApiError && error.status === 404 && query.page > 1;
                setState({ key: queryKey, data: null, error: !outOfRange, outOfRange });
            });

        return () => {
            cancelled = true;
        };
        // query однозначно задаётся queryKey
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadOnClient, queryKey, attempt]);

    const isCurrent = state.key === queryKey;
    const clientData = isCurrent ? state.data : null;

    const retry = useCallback(() => setAttempt((value) => value + 1), []);

    return {
        data: serverData ?? clientData,
        isLoading: loadOnClient && (!isCurrent || (!state.data && !state.error && !state.outOfRange)),
        isError: loadOnClient && isCurrent && state.error,
        isOutOfRange: loadOnClient && isCurrent && state.outOfRange,
        retry,
    };
};

// Варианты фильтров: с сервера, а если там не получилось — из браузера
export const useFilterOptions = (initialOptions: ProductFilterOptions | null) => {
    const [loadedOptions, setLoadedOptions] = useState<ProductFilterOptions | null>(null);
    const loadOnClient = initialOptions === null;

    useEffect(() => {
        if (!loadOnClient) return;
        let cancelled = false;
        productsApi
            .getFilters()
            .then((options) => {
                if (!cancelled) setLoadedOptions(options);
            })
            .catch(() => {
                // без вариантов фильтры всё равно работают: материалы показываются полным списком
            });
        return () => {
            cancelled = true;
        };
    }, [loadOnClient]);

    return initialOptions ?? loadedOptions;
};
