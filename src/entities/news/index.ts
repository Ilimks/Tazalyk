export { NewsCard } from './ui/NewsCard';

export { default as newsReducer } from './model/newsSlice';
export { 
    fetchNews, 
    fetchNewsByIdThunk, 
    createNewsThunk, 
    updateNewsThunk, 
    deleteNewsThunk,
    clearCurrentNews, 
    clearError 
} from './model/newsSlice';
export type { News, NewsState } from './model/types';

// Экспортируем API функции для прямого использования (если нужно)
export { fetchNewsById, fetchAllNews, createNews, updateNews, deleteNews } from './api/newsApi';