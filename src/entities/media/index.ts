// Video exports
export { default as videoReducer } from './model/videoSlice';
export { 
    fetchVideos, 
    fetchVideoById, 
    createVideo, 
    updateVideo, 
    deleteVideo,
    clearCurrentVideo,
    clearError as clearVideoError  // Переименовано для видео
} from './model/videoSlice';

// Photo exports
export { default as photoReducer } from './model/photoSlice';
export { 
    fetchPhotos, 
    fetchPhotoById, 
    createPhoto, 
    updatePhoto, 
    deletePhoto,
    clearCurrentPhoto,
    clearError as clearPhotoError  // Переименовано для фото
} from './model/photoSlice';

// Types
export type { Video, VideoState } from './model/types';
export type { Photo, PhotoState } from './model/types';