import { combineReducers } from '@reduxjs/toolkit';
import newsReducer from '@/entities/news/model/newsSlice';
import { videoReducer, photoReducer } from '@/entities/media';
import { documentReducer } from '@/entities/document';
import procurementReducer from '@/entities/procurement/model/procurementSlice';
import { cartReducer } from '@/features/cart/model/cartSlice';

export const rootReducer = combineReducers({
    news: newsReducer,
    videos: videoReducer,
    photos: photoReducer,
    procurements: procurementReducer,
    documents: documentReducer,
    cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;