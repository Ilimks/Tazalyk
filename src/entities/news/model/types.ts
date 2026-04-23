export interface News {
    id: string;
    title_ru: string;
    description_ru: string;
    title_ky?: string;
    description_ky?: string;
    image?: string;
    date: string;
    created_at: string;
}

export interface NewsState {
    items: News[];
    currentNews: News | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}