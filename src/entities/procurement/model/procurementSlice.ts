// src/entities/procurement/model/procurementSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { procurementsApi } from '@/shared/api';
import { ProcurementItem } from './types';

interface ProcurementState {
    items: ProcurementItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    totalPages: number;
    currentPage: number;
    totalCount: number;
}

interface FetchProcurementsParams {
    page: number;
    pageSize: number;
}

interface FetchProcurementsResponse {
    items: ProcurementItem[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

const initialState: ProcurementState = {
    items: [],
    status: 'idle',
    error: null,
    totalPages: 0,
    currentPage: 1,
    totalCount: 0
};

// Только GET запросы
export const fetchProcurements = createAsyncThunk(
    'procurements/fetchAll',
    async ({ page, pageSize }: FetchProcurementsParams) => {
        const response = await procurementsApi.getAll(page, pageSize);
        return response;
    }
);

export const fetchProcurementById = createAsyncThunk(
    'procurements/fetchById',
    async (id: string) => {
        return await procurementsApi.getById(id);
    }
);

const procurementSlice = createSlice({
    name: 'procurements',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all (с пагинацией)
            .addCase(fetchProcurements.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProcurements.fulfilled, (state, action: PayloadAction<FetchProcurementsResponse>) => {
                state.status = 'succeeded';
                state.items = action.payload.items;
                state.totalCount = action.payload.totalCount;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchProcurements.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch procurements';
                state.items = [];
            })
            // Fetch by id
            .addCase(fetchProcurementById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProcurementById.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(fetchProcurementById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch procurement';
            });
    },
});

export const { clearError } = procurementSlice.actions;
export const procurementReducer = procurementSlice.reducer;
export default procurementSlice.reducer; // ← ДОБАВЬТЕ ЭТУ СТРОКУ