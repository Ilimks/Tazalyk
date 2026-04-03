export interface Photo {
    id: string;
    title: string;
    description: string;
    main_image: string;
    gallery_images: string[];
    date: string;
    created_at: string;
    updated_at?: string;
}

export interface Video {
    id: string;
    title: string;
    description: string;
    main_video_url: string;
    gallery_videos: string[];
    date: string;
    created_at: string;
    updated_at?: string;
}

export type MediaType = 'photos' | 'videos';