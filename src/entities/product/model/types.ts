import type { PaginatedResponse } from '@/shared/api';

export type ProductMaterial = 'plastic' | 'metal' | 'galvanized';

export type ProductOrdering = 'price' | '-price' | 'volume' | '-volume' | 'new';

export interface Product {
    id: string;
    name_ru: string;
    name_ky: string;
    description_ru: string;
    description_ky: string;
    volume: number;
    material: ProductMaterial;
    material_label: string;
    price: string;
    image: string | null;
    in_stock: boolean;
    is_featured: boolean;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

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

export interface ProductFilterOptions {
    volumes: number[];
    materials: { value: ProductMaterial; label: string }[];
    price: { min: string | null; max: string | null };
}
