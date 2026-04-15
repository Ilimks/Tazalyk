export interface Photo {
    id: string;
    main_image: string;
    gallery_images: string[];
    date: string;
    created_at: string;
    updated_at?: string;
}

export interface PhotoState {
    items: Photo[];
    currentPhoto: Photo | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface Video {
    id: string;
    main_video_url: string;
    gallery_videos: string[];
    thumbnail?: string;
    date: string;
    created_at: string;
    updated_at?: string;
}

export interface VideoState {
    items: Video[];
    currentVideo: Video | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
export type MediaType = 'photos' | 'videos';