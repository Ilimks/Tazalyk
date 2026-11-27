import {
    PRODUCT_MATERIALS,
    PRODUCTS_PAGE_SIZE,
    isProductOrdering,
    type ProductMaterial,
    type ProductOrdering,
    type ProductQuery,
} from '@/entities/product';

export interface ShopQuery {
    volumes: number[];
    materials: ProductMaterial[];
    priceMin: number | null;
    priceMax: number | null;
    inStock: boolean;
    ordering: ProductOrdering | null;
    page: number;
}

export const EMPTY_SHOP_QUERY: ShopQuery = {
    volumes: [],
    materials: [],
    priceMin: null,
    priceMax: null,
    inStock: false,
    ordering: null,
    page: 1,
};

const MAX_VOLUMES = 30;
const MAX_PRICE = 1_000_000_000;
const MAX_PAGE = 1000;

interface ParamsReader {
    get(name: string): string | null;
}

const splitList = (value: string | null): string[] =>
    (value ?? '').split(',').map((part) => part.trim()).filter(Boolean);

const parsePriceParam = (value: string | null): number | null => {
    const text = value?.trim() ?? '';
    if (!/^\d{1,10}$/.test(text)) return null;
    const price = Number(text);
    return price <= MAX_PRICE ? price : null;
};

const sortNumbers = (values: number[]) => [...values].sort((a, b) => a - b);

export const parseShopQuery = (params: ParamsReader): ShopQuery => {
    const volumes = sortNumbers(
        Array.from(
            new Set(
                splitList(params.get('volume'))
                    .filter((value) => /^\d{1,6}$/.test(value))
                    .map(Number)
                    .filter((value) => value > 0)
            )
        )
    ).slice(0, MAX_VOLUMES);

    const selectedMaterials = new Set(splitList(params.get('material')));
    const ordering = params.get('ordering');
    const page = Number.parseInt(params.get('page') ?? '', 10);

    return {
        volumes,
        materials: PRODUCT_MATERIALS.filter((material) => selectedMaterials.has(material)),
        priceMin: parsePriceParam(params.get('price_min')),
        priceMax: parsePriceParam(params.get('price_max')),
        inStock: ['1', 'true'].includes(params.get('in_stock') ?? ''),
        ordering: isProductOrdering(ordering) ? ordering : null,
        page: Number.isFinite(page) && page > 1 ? Math.min(page, MAX_PAGE) : 1,
    };
};

export const searchParamsFromRecord = (
    record: Record<string, string | string[] | undefined>
): URLSearchParams => {
    const params = new URLSearchParams();
    Object.entries(record).forEach(([key, value]) => {
        const first = Array.isArray(value) ? value[0] : value;
        if (typeof first === 'string') params.set(key, first);
    });
    return params;
};

export const serializeShopQuery = (query: ShopQuery): string => {
    const parts: string[] = [];
    if (query.volumes.length) parts.push(`volume=${sortNumbers(query.volumes).join(',')}`);
    if (query.materials.length) {
        parts.push(`material=${PRODUCT_MATERIALS.filter((m) => query.materials.includes(m)).join(',')}`);
    }
    if (query.priceMin !== null) parts.push(`price_min=${query.priceMin}`);
    if (query.priceMax !== null) parts.push(`price_max=${query.priceMax}`);
    if (query.inStock) parts.push('in_stock=1');
    if (query.ordering) parts.push(`ordering=${query.ordering}`);
    if (query.page > 1) parts.push(`page=${query.page}`);
    return parts.join('&');
};

export const getShopHref = (query: ShopQuery): string => {
    const search = serializeShopQuery(query);
    return search ? `/shop?${search}` : '/shop';
};

export const toProductQuery = (query: ShopQuery, pageSize: number = PRODUCTS_PAGE_SIZE): ProductQuery => ({
    page: query.page,
    page_size: pageSize,
    volume: query.volumes,
    material: query.materials,
    price_min: query.priceMin,
    price_max: query.priceMax,
    in_stock: query.inStock,
    ordering: query.ordering,
});

export const countActiveFilters = (query: ShopQuery): number =>
    query.volumes.length +
    query.materials.length +
    (query.priceMin !== null || query.priceMax !== null ? 1 : 0) +
    (query.inStock ? 1 : 0);

export const resetShopFilters = (query: ShopQuery): ShopQuery => ({
    ...EMPTY_SHOP_QUERY,
    ordering: query.ordering,
});
