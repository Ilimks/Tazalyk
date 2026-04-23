// src/shared/api/index.ts
import { videosApi } from './endpoints/videos';
import { photosApi } from './endpoints/photos';
import { newsApi } from './endpoints/news';
import { procurementsApi } from './endpoints/procurements';

// Старый API объект (только для GET запросов)
export const api = {
    // Видео
    getVideos: videosApi.getAll,
    
    // Фото
    getPhotos: photosApi.getAll,
    
    // Новости
    getNews: newsApi.getAll,
    
    // Закупки
    getProcurements: procurementsApi.getAll,
};

// Новые экспорты
export { baseApi } from './baseApi';
export { newsApi } from './endpoints/news';
export { videosApi } from './endpoints/videos';
export { photosApi } from './endpoints/photos';
export { procurementsApi } from './endpoints/procurements';

// Типы
export type { News } from './endpoints/news';
export type { Video } from './endpoints/videos';
export type { Photo } from './endpoints/photos';
export type { Procurement } from './endpoints/procurements';