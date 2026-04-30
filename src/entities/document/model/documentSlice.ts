import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { localActsApi } from '@/shared/api/endpoints/localActs';
import { legislationApi } from '@/shared/api/endpoints/legislation';
import { Document, DocumentsState } from './types';

const initialState: DocumentsState = {
    items: [],
    loading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    pageSize: 10,
};

export const fetchLocalActs = createAsyncThunk(
    'documents/fetchLocalActs',
    async () => {
        return await localActsApi.getAll();
    }
);

export const fetchLegislation = createAsyncThunk(
    'documents/fetchLegislation',
    async () => {
        return await legislationApi.getAll();
    }
);

const documentSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocalActs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLocalActs.fulfilled, (state, action: PayloadAction<Document[]>) => {
                state.loading = false;
                state.items = action.payload;
                state.totalCount = action.payload.length;
            })
            .addCase(fetchLocalActs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки локальных актов';
            })
            .addCase(fetchLegislation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLegislation.fulfilled, (state, action: PayloadAction<Document[]>) => {
                state.loading = false;
                state.items = action.payload;
                state.totalCount = action.payload.length;
            })
            .addCase(fetchLegislation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка загрузки законодательства';
            });
    },
});

export const { clearError } = documentSlice.actions;
export default documentSlice.reducer;