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
export { newsApi, NEWS_REVALIDATE_SECONDS, getServerFetchOptions } from './api/newsApi';
export { getNewsTitle, getNewsDescription, getNewsDate } from './lib/localize';

export type { NewsState } from './model/newsSlice';
export type { News, NewsFilters, PaginatedNewsResponse } from './model/types';
