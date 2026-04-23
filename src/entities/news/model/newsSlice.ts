import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllNews, fetchNewsById, fetchLatestNews } from '../api/newsApi';
import { News, NewsState } from './types';

const initialState: NewsState = {
    items: [],
    currentNews: null,
    status: 'idle',
    error: null,
};

export const fetchNews = createAsyncThunk(
    'news/fetchAll',
    async ({ page, pageSize }: { page?: number; pageSize?: number } = {}) => {
        console.log('fetchNews called with:', { page, pageSize }); // Отладка
        const response = await fetchAllNews(page, pageSize);
        console.log('fetchNews response:', response); // Отладка
        return response;
    }
);

export const fetchLatestNewsThunk = createAsyncThunk(
    'news/fetchLatest',
    async (limit: number = 4) => {
        console.log('fetchLatestNewsThunk called with limit:', limit); // Отладка
        const response = await fetchLatestNews(limit);
        console.log('fetchLatestNewsThunk response:', response); // Отладка
        return response;
    }
);

export const fetchNewsByIdThunk = createAsyncThunk(
    'news/fetchById',
    async (id: string) => {
        const response = await fetchNewsById(id);
        if (!response) throw new Error('News not found');
        return response;
    }
);

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        clearCurrentNews: (state) => {
            state.currentNews = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all
            .addCase(fetchNews.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action: PayloadAction<News[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch news';
            })
            // Fetch latest
            .addCase(fetchLatestNewsThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchLatestNewsThunk.fulfilled, (state, action: PayloadAction<News[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchLatestNewsThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch latest news';
            })
            // Fetch by id
            .addCase(fetchNewsByIdThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchNewsByIdThunk.fulfilled, (state, action: PayloadAction<News>) => {
                state.status = 'succeeded';
                state.currentNews = action.payload;
            })
            .addCase(fetchNewsByIdThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch news';
            });
    },
});

export const { clearCurrentNews, clearError } = newsSlice.actions;
export default newsSlice.reducer;