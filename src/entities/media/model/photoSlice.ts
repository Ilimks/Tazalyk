// src/entities/media/model/photoSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { photosApi } from '@/shared/api/endpoints/photos';
import { Photo, PhotoState } from './types';

interface FetchPhotosParams {
    page: number;
    pageSize: number;
}

interface FetchPhotosResponse {
    items: Photo[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

const initialState: PhotoState = {
    items: [],
    currentPhoto: null,
    status: 'idle',
    error: null,
    totalPages: 0,
    currentPage: 1,
    totalCount: 0
};

export const fetchPhotos = createAsyncThunk(
    'photos/fetchAll',
    async ({ page, pageSize }: FetchPhotosParams) => {
        const response = await photosApi.getAll(page, pageSize);
        return response;
    }
);

export const fetchPhotoById = createAsyncThunk('photos/fetchById', async (id: string) => {
    return await photosApi.getById(id);
});

const photoSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        clearCurrentPhoto: (state) => {
            state.currentPhoto = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhotos.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchPhotos.fulfilled, (state, action: PayloadAction<FetchPhotosResponse>) => {
                state.status = 'succeeded';
                state.items = action.payload.items;
                state.totalCount = action.payload.totalCount;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchPhotos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch photos';
                state.items = [];
            })
            .addCase(fetchPhotoById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPhotoById.fulfilled, (state, action: PayloadAction<Photo>) => {
                state.status = 'succeeded';
                state.currentPhoto = action.payload;
            })
            .addCase(fetchPhotoById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch photo';
            });
    },
});

export const { clearCurrentPhoto, clearError } = photoSlice.actions;
export const photoReducer = photoSlice.reducer;