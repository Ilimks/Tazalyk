export type SearchHitType =
    | 'page'
    | 'service'
    | 'news'
    | 'product'
    | 'vacancy'
    | 'local_act'
    | 'legislation'
    | 'procurement';

export const SEARCH_HIT_TYPES: readonly SearchHitType[] = [
    'page',
    'service',
    'news',
    'product',
    'vacancy',
    'local_act',
    'legislation',
    'procurement',
];

export interface SearchHit {
    key: string;
    type: SearchHitType;
    title: string;
    snippet: string;
    url: string;
    date?: string;
    score: number;
}

export interface SearchEntry {
    id: string;
    type: 'page' | 'service';
    url: string;
    title: string;
    titleKy: string;
    text?: string;
    textKy?: string;
    role?: 'page' | 'item';
}

export interface ApiSearchItem {
    type: Exclude<SearchHitType, 'page' | 'service'>;
    id: string;
    title_ru: string;
    title_ky: string;
    snippet_ru: string;
    snippet_ky: string;
    date: string | null;
    in_title: boolean;
}
