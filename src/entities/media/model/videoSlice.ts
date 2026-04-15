import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { videosApi } from '@/shared/api/endpoints/videos';
import { Video, VideoState } from './types';

const initialState: VideoState = {
    items: [],
    currentVideo: null,
    status: 'idle',
    error: null,
};

// Async Thunks
export const fetchVideos = createAsyncThunk('videos/fetchAll', async () => {
    return await videosApi.getAll();
});

export const fetchVideoById = createAsyncThunk('videos/fetchById', async (id: string) => {
    return await videosApi.getById(id);
});

export const createVideo = createAsyncThunk('videos/create', async (data: Omit<Video, 'id' | 'created_at' | 'updated_at'>) => {
    return await videosApi.create(data);
});

export const updateVideo = createAsyncThunk('videos/update', async ({ id, data }: { id: string; data: Partial<Video> }) => {
    return await videosApi.update(id, data);
});

export const deleteVideo = createAsyncThunk('videos/delete', async (id: string) => {
    await videosApi.delete(id);
    return id;
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
            // Fetch all
            .addCase(fetchVideos.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchVideos.fulfilled, (state, action: PayloadAction<Video[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch videos';
            })
            // Fetch by id
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
            })
            // Create
            .addCase(createVideo.fulfilled, (state, action: PayloadAction<Video>) => {
                state.items.unshift(action.payload);
            })
            .addCase(createVideo.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to create video';
            })
            // Update
            .addCase(updateVideo.fulfilled, (state, action: PayloadAction<Video>) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                if (state.currentVideo?.id === action.payload.id) {
                    state.currentVideo = action.payload;
                }
            })
            .addCase(updateVideo.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to update video';
            })
            // Delete
            .addCase(deleteVideo.fulfilled, (state, action: PayloadAction<string>) => {
                state.items = state.items.filter(item => item.id !== action.payload);
                if (state.currentVideo?.id === action.payload) {
                    state.currentVideo = null;
                }
            })
            .addCase(deleteVideo.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete video';
            });
    },
});

export const { clearCurrentVideo, clearError } = videoSlice.actions;
export default videoSlice.reducer;