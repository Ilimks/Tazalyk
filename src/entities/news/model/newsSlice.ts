import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { newsApi } from '../api/newsApi';
import { News, NewsFilters, PaginatedNewsResponse } from './types';

export interface NewsState {
    items: News[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
    currentNews: News | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: NewsState = {
    items: [],
    totalCount: 0,
    currentPage: 1,
    pageSize: 12,
    currentNews: null,
    status: 'idle',
    error: null,
};

export const fetchNews = createAsyncThunk(
    'news/fetchAll',
    async (filters: NewsFilters) => {
        const response = await newsApi.getAll(filters);
        return response;
    }
);

export const fetchNewsById = createAsyncThunk(
    'news/fetchById',
    async (id: string) => {
        return await newsApi.getById(id);
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
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload;
            state.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action: PayloadAction<PaginatedNewsResponse>) => {
                state.status = 'succeeded';
                state.items = action.payload.results;
                state.totalCount = action.payload.count;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Ошибка загрузки новостей';
            })
            .addCase(fetchNewsById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchNewsById.fulfilled, (state, action: PayloadAction<News>) => {
                state.status = 'succeeded';
                state.currentNews = action.payload;
            })
            .addCase(fetchNewsById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Новость не найдена';
            });
    },
});

export const { clearCurrentNews, clearError, setPage, setPageSize } = newsSlice.actions;
export default newsSlice.reducer;