export { 
    fetchVideos, 
    fetchVideoById,
    clearCurrentVideo,
    clearError,
    videoReducer,
} from './model/videoSlice';

export { 
    fetchPhotos, 
    fetchPhotoById,
    clearCurrentPhoto,
    clearError as clearPhotoError,
    photoReducer,
} from './model/photoSlice';

// Types
export type { Video, VideoState } from './model/types';
export type { Photo, PhotoState } from './model/types';
export type { MediaType } from './model/types';