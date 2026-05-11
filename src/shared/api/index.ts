import { videosApi } from './endpoints/videos';
import { photosApi } from './endpoints/photos';
import { newsApi } from './endpoints/news';
import { procurementsApi } from './endpoints/procurements';

export const api = {
    getVideos: videosApi.getAll,
    
    getPhotos: photosApi.getAll,
    
    getNews: newsApi.getAll,
    
    getProcurements: procurementsApi.getAll,
};

export { baseApi } from './baseApi';
export { newsApi } from './endpoints/news';
export { videosApi } from './endpoints/videos';
export { photosApi } from './endpoints/photos';
export { procurementsApi } from './endpoints/procurements';

export type { News } from './endpoints/news';
export type { Video } from './endpoints/videos';
export type { Photo } from './endpoints/photos';
export type { Procurement } from './endpoints/procurements';