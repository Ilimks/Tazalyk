// entities/news/index.ts
export { NewsCard } from './ui/NewsCard';
export { 
    fetchNews, 
    fetchLatestNewsThunk,
    fetchNewsByIdThunk,
    clearCurrentNews,
    clearError,
    default as newsReducer
} from './model/newsSlice';
export type { News, NewsState } from './model/types';