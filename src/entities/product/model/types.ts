import type { PaginatedResponse } from '@/shared/api';

export type ProductMaterial = 'plastic' | 'metal' | 'galvanized';

// ?ordering= в API; без параметра — порядок, заданный менеджером («сначала популярные»)
export type ProductOrdering = 'price' | '-price' | 'volume' | '-volume' | 'new';

export interface Product {
    id: string;
    name_ru: string;
    // '' — перевода нет, показываем name_ru
    name_ky: string;
    description_ru: string;
    description_ky: string;
    // объём в литрах
    volume: number;
    material: ProductMaterial;
    // подпись материала на русском; на сайте материал переводится по значению material
    material_label: string;
    // десятичное число строкой, например "3500.00"
    price: string;
    // абсолютный адрес фото или null
    image: string | null;
    in_stock: boolean;
    is_featured: boolean;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

// Параметры списка товаров (GET /shop/products/)
export interface ProductQuery {
    page?: number;
    page_size?: number;
    volume?: number[];
    material?: ProductMaterial[];
    price_min?: number | null;
    price_max?: number | null;
    in_stock?: boolean;
    featured?: boolean;
    q?: string;
    ordering?: ProductOrdering | null;
}

export type PaginatedProductsResponse = PaginatedResponse<Product>;

// Варианты фильтров магазина (GET /shop/products/filters/) — только по опубликованным товарам
export interface ProductFilterOptions {
    volumes: number[];
    materials: { value: ProductMaterial; label: string }[];
    price: { min: string | null; max: string | null };
}
