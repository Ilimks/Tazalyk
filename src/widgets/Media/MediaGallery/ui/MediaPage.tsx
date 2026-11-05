import { photosApi, videosApi } from '@/entities/media';
import { getServerFetchOptions, type PageResult } from '@/shared/api';
import { MediaGallery } from './MediaGallery';

const MEDIA_PER_PAGE = 12;

// если API недоступен, вкладка загрузится в браузере и покажет ошибку с кнопкой повтора
const prefetch = async <T,>(request: Promise<PageResult<T>>, label: string): Promise<PageResult<T> | null> => {
    try {
        return await request;
    } catch (error) {
        console.error(`Failed to prefetch ${label}:`, error);
        return null;
    }
};

// Первые страницы фото и видео загружаются на сервере — они сразу есть в HTML для поисковиков,
// а счётчики обеих вкладок верны с первого рендера
export const MediaPage = async () => {
    const [initialPhotos, initialVideos] = await Promise.all([
        prefetch(photosApi.getAll(1, MEDIA_PER_PAGE, getServerFetchOptions()), 'photos'),
        prefetch(videosApi.getAll(1, MEDIA_PER_PAGE, getServerFetchOptions()), 'videos'),
    ]);

    return (
        <MediaGallery
            itemsPerPage={MEDIA_PER_PAGE}
            initialPhotos={initialPhotos}
            initialVideos={initialVideos}
        />
    );
};
