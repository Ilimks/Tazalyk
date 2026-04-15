import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllNews, fetchNewsById, createNews, updateNews, deleteNews } from '../api/newsApi';
import { News, NewsState } from './types';

const initialState: NewsState = {
    items: [],
    currentNews: null,
    status: 'idle',
    error: null,
};

// Async Thunks - используют ваши существующие API функции
export const fetchNews = createAsyncThunk(
    'news/fetchAll',
    async () => {
        const response = await fetchAllNews();
        if (!response) throw new Error('Failed to fetch news');
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

export const createNewsThunk = createAsyncThunk(
    'news/create',
    async (data: Omit<News, 'id' | 'created_at'>) => {
        const response = await createNews(data);
        if (!response) throw new Error('Failed to create news');
        return response;
    }
);

export const updateNewsThunk = createAsyncThunk(
    'news/update',
    async ({ id, data }: { id: string; data: Partial<News> }) => {
        const response = await updateNews(id, data);
        if (!response) throw new Error('Failed to update news');
        return response;
    }
);

export const deleteNewsThunk = createAsyncThunk(
    'news/delete',
    async (id: string) => {
        const response = await deleteNews(id);
        if (!response) throw new Error('Failed to delete news');
        return id;
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
            })
            // Create
            .addCase(createNewsThunk.fulfilled, (state, action: PayloadAction<News>) => {
                state.items.unshift(action.payload);
            })
            .addCase(createNewsThunk.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to create news';
            })
            // Update
            .addCase(updateNewsThunk.fulfilled, (state, action: PayloadAction<News>) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                if (state.currentNews?.id === action.payload.id) {
                    state.currentNews = action.payload;
                }
            })
            .addCase(updateNewsThunk.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to update news';
            })
            // Delete
            .addCase(deleteNewsThunk.fulfilled, (state, action: PayloadAction<string>) => {
                state.items = state.items.filter(item => item.id !== action.payload);
                if (state.currentNews?.id === action.payload) {
                    state.currentNews = null;
                }
            })
            .addCase(deleteNewsThunk.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete news';
            });
    },
});

export const { clearCurrentNews, clearError } = newsSlice.actions;
export default newsSlice.reducer;