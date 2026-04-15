// Старый API объект для обратной совместимости
// Постепенно заменяйте на новые импорты

import { authApi } from './endpoints/auth';
import { videosApi } from './endpoints/videos';
import { photosApi } from './endpoints/photos';
import { newsApi } from './endpoints/news';
import { procurementsApi } from './endpoints/procurements';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Старый API объект (для обратной совместимости)
export const api = {
    // Аутентификация
    login: authApi.login,
    importData: authApi.importData,

    // Видео
    getVideos: videosApi.getAll,
    createVideo: videosApi.create,
    updateVideo: videosApi.update,
    deleteVideo: videosApi.delete,

    // Фото
    getPhotos: photosApi.getAll,
    createPhoto: photosApi.create,
    updatePhoto: photosApi.update,
    deletePhoto: photosApi.delete,

    // Новости
    getNews: newsApi.getAll,
    createNews: newsApi.create,
    updateNews: newsApi.update,
    deleteNews: newsApi.delete,

    // Закупки
    getProcurements: procurementsApi.getAll,
    createProcurement: procurementsApi.create,
    updateProcurement: procurementsApi.update,
    deleteProcurement: procurementsApi.delete,
};

// Новые экспорты для постепенного перехода
export { baseApi } from './baseApi';
export { authApi } from './endpoints/auth';
export { newsApi } from './endpoints/news';
export { videosApi } from './endpoints/videos';
export { photosApi } from './endpoints/photos';
export { procurementsApi } from './endpoints/procurements';
export type { News } from './endpoints/news';
export type { Video } from './endpoints/videos';
export type { Photo } from './endpoints/photos';
export type { Procurement } from './endpoints/procurements';