export interface News {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string;        // Основное поле для даты
    created_at: string;  // Автоматическое поле Django
    // Убираем publishedAt, так как его нет в Django модели
}