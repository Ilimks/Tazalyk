'use client';
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import type { ProductOrdering } from '@/entities/product';
import {
    getShopHref,
    parseShopQuery,
    resetShopFilters,
    serializeShopQuery,
    type ShopQuery,
} from './shopQuery';

export const useShopQuery = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const appliedQuery = useMemo(() => parseShopQuery(searchParams), [searchParams]);
    const queryKey = useMemo(() => serializeShopQuery(appliedQuery), [appliedQuery]);

    const [pendingQuery, setPendingQuery] = useState<ShopQuery | null>(null);
    const query = pendingQuery ?? appliedQuery;
    const queryRef = useRef(query);
    queryRef.current = query;

    useEffect(() => {
        if (!isPending) setPendingQuery(null);
    }, [isPending, queryKey]);

    const navigate = useCallback(
        (next: ShopQuery) => {
            setPendingQuery(next);
            startTransition(() => {
                router.replace(getShopHref(next), { scroll: false });
            });
        },
        [router]
    );

    const setFilters = useCallback((next: ShopQuery) => navigate({ ...next, page: 1 }), [navigate]);

    const setOrdering = useCallback(
        (ordering: ProductOrdering | null) => navigate({ ...queryRef.current, ordering, page: 1 }),
        [navigate]
    );

    const setPage = useCallback((page: number) => navigate({ ...queryRef.current, page }), [navigate]);

    const reset = useCallback(() => navigate(resetShopFilters(queryRef.current)), [navigate]);

    return { query, appliedQuery, queryKey, isPending, setFilters, setOrdering, setPage, reset };
};
