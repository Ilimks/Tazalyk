export interface News {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string;        // Основное поле для даты
    created_at: string;  // Автоматическое поле Django
}

export interface NewsState {
    items: News[];
    currentNews: News | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}