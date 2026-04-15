import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { procurementsApi } from '@/shared/api/endpoints/procurements';
import { ProcurementItem, ProcurementState } from './types';

const initialState: ProcurementState = {
    items: [],
    status: 'idle',
    error: null,
};

// Async Thunks
export const fetchProcurements = createAsyncThunk('procurements/fetchAll', async () => {
    return await procurementsApi.getAll();
});

export const fetchProcurementById = createAsyncThunk('procurements/fetchById', async (id: string) => {
    return await procurementsApi.getById(id);
});

export const createProcurement = createAsyncThunk('procurements/create', async (data: Omit<ProcurementItem, 'id' | 'created_at' | 'updated_at'>) => {
    return await procurementsApi.create(data);
});

export const updateProcurement = createAsyncThunk('procurements/update', async ({ id, data }: { id: string; data: Partial<ProcurementItem> }) => {
    return await procurementsApi.update(id, data);
});

export const deleteProcurement = createAsyncThunk('procurements/delete', async (id: string) => {
    await procurementsApi.delete(id);
    return id;
});

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
            // Fetch all
            .addCase(fetchProcurements.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProcurements.fulfilled, (state, action: PayloadAction<ProcurementItem[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProcurements.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch procurements';
            })
            // Fetch by id
            .addCase(fetchProcurementById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProcurementById.fulfilled, (state, action: PayloadAction<ProcurementItem>) => {
                state.status = 'succeeded';
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(fetchProcurementById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch procurement';
            })
            // Create
            .addCase(createProcurement.fulfilled, (state, action: PayloadAction<ProcurementItem>) => {
                state.items.unshift(action.payload);
            })
            .addCase(createProcurement.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to create procurement';
            })
            // Update
            .addCase(updateProcurement.fulfilled, (state, action: PayloadAction<ProcurementItem>) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateProcurement.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to update procurement';
            })
            // Delete
            .addCase(deleteProcurement.fulfilled, (state, action: PayloadAction<string>) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteProcurement.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete procurement';
            });
    },
});

export const { clearError } = procurementSlice.actions;
export default procurementSlice.reducer;