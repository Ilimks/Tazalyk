import { combineReducers } from '@reduxjs/toolkit';
import newsReducer from '@/entities/news/model/newsSlice';
import { videoReducer, photoReducer } from '@/entities/media';
import procurementReducer from '@/entities/procurement/model/procurementSlice';

export const rootReducer = combineReducers({
    news: newsReducer,
    videos: videoReducer,
    photos: photoReducer,
    procurements: procurementReducer,
});

export type RootState = ReturnType<typeof rootReducer>;