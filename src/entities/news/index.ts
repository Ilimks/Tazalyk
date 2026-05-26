export { NewsCard } from './ui/NewsCard';
export {
    fetchNews,
    fetchNewsById,
    clearCurrentNews,
    clearError,
    setPage,
    setPageSize,
    default as newsReducer,
} from './model/newsSlice';

// Типы (добавьте NewsFilters и PaginatedNewsResponse, если нужны в других модулях)
export type { News, NewsState } from './model/types';
export type { NewsFilters, PaginatedNewsResponse } from './api/newsApi';