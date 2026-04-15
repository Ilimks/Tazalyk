import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { photosApi } from '@/shared/api/endpoints/photos';
import { Photo, PhotoState } from './types';

const initialState: PhotoState = {
    items: [],
    currentPhoto: null,
    status: 'idle',
    error: null,
};

// Async Thunks
export const fetchPhotos = createAsyncThunk('photos/fetchAll', async () => {
    return await photosApi.getAll();
});

export const fetchPhotoById = createAsyncThunk('photos/fetchById', async (id: string) => {
    return await photosApi.getById(id);
});

export const createPhoto = createAsyncThunk('photos/create', async (data: Omit<Photo, 'id' | 'created_at' | 'updated_at'>) => {
    return await photosApi.create(data);
});

export const updatePhoto = createAsyncThunk('photos/update', async ({ id, data }: { id: string; data: Partial<Photo> }) => {
    return await photosApi.update(id, data);
});

export const deletePhoto = createAsyncThunk('photos/delete', async (id: string) => {
    await photosApi.delete(id);
    return id;
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
            // Fetch all
            .addCase(fetchPhotos.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchPhotos.fulfilled, (state, action: PayloadAction<Photo[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchPhotos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch photos';
            })
            // Fetch by id
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
            })
            // Create
            .addCase(createPhoto.fulfilled, (state, action: PayloadAction<Photo>) => {
                state.items.unshift(action.payload);
            })
            .addCase(createPhoto.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to create photo';
            })
            // Update
            .addCase(updatePhoto.fulfilled, (state, action: PayloadAction<Photo>) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                if (state.currentPhoto?.id === action.payload.id) {
                    state.currentPhoto = action.payload;
                }
            })
            .addCase(updatePhoto.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to update photo';
            })
            // Delete
            .addCase(deletePhoto.fulfilled, (state, action: PayloadAction<string>) => {
                state.items = state.items.filter(item => item.id !== action.payload);
                if (state.currentPhoto?.id === action.payload) {
                    state.currentPhoto = null;
                }
            })
            .addCase(deletePhoto.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete photo';
            });
    },
});

export const { clearCurrentPhoto, clearError } = photoSlice.actions;
export default photoSlice.reducer;