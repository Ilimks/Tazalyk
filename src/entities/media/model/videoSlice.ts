// src/entities/media/model/videoSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { videosApi } from '@/shared/api/endpoints/videos';
import { Video, VideoState } from './types';

interface FetchVideosParams {
    page: number;
    pageSize: number;
}

interface FetchVideosResponse {
    items: Video[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

const initialState: VideoState = {
    items: [],
    currentVideo: null,
    status: 'idle',
    error: null,
    totalPages: 0,
    currentPage: 1,
    totalCount: 0
};

export const fetchVideos = createAsyncThunk(
    'videos/fetchAll',
    async ({ page, pageSize }: FetchVideosParams) => {
        const response = await videosApi.getAll(page, pageSize);
        return response;
    }
);

export const fetchVideoById = createAsyncThunk('videos/fetchById', async (id: string) => {
    return await videosApi.getById(id);
});

const videoSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        clearCurrentVideo: (state) => {
            state.currentVideo = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchVideos.fulfilled, (state, action: PayloadAction<FetchVideosResponse>) => {
                state.status = 'succeeded';
                state.items = action.payload.items;
                state.totalCount = action.payload.totalCount;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch videos';
                state.items = [];
            })
            .addCase(fetchVideoById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVideoById.fulfilled, (state, action: PayloadAction<Video>) => {
                state.status = 'succeeded';
                state.currentVideo = action.payload;
            })
            .addCase(fetchVideoById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch video';
            });
    },
});

export const { clearCurrentVideo, clearError } = videoSlice.actions;
export const videoReducer = videoSlice.reducer;