'use client'
import { useState, useEffect } from 'react';
import styles from './MediaGallery.module.scss';
import mobile from './MediaGalleryMobile.module.scss';
import { api } from '@/shared/api/api';
import { VideoModal } from '@/widgets/VideosCard/ui/VideoModal/VideoModal';
import { Loading } from '@/shared/ui/Loading';
import { PhotoCard } from '@/widgets/PhotoCard/ui/PhotoCard';
import { VideoCard } from '@/widgets/VideosCard/ui/VideosCard';

interface Photo {
    id: string;
    title: string;
    description: string;
    main_image: string;
    gallery_images: string[];
    date: string;
    created_at: string;
}

interface Video {
    id: string;
    title: string;
    description: string;
    main_video_url: string;
    gallery_videos: string[];
    date: string;
    created_at: string;
}

type GalleryType = 'photos' | 'videos';

const ITEMS_PER_PAGE = 12;

export const MediaGallery: React.FC = () => {
    const [activeTab, setActiveTab] = useState<GalleryType>('photos');
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [allPhotoImages, setAllPhotoImages] = useState<string[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    // Пагинация
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(ITEMS_PER_PAGE);

    useEffect(() => {
        loadMedia();
    }, []);

    // Сброс страницы при смене таба
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    const loadMedia = async () => {
        try {
            setLoading(true);
            const [photosData, videosData] = await Promise.all([
                api.getPhotos(),
                api.getVideos()
            ]);
            
            const sortedPhotos = [...photosData].sort((a, b) => {
                const dateA = new Date(a.date || a.created_at).getTime();
                const dateB = new Date(b.date || b.created_at).getTime();
                return dateB - dateA;
            });
            
            const sortedVideos = [...videosData].sort((a, b) => {
                const dateA = new Date(a.date || a.created_at).getTime();
                const dateB = new Date(b.date || b.created_at).getTime();
                return dateB - dateA;
            });
            
            setPhotos(sortedPhotos);
            setVideos(sortedVideos);
            setError(null);
        } catch (err) {
            console.error('Error loading media:', err);
            setError('Не удалось загрузить медиафайлы');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Открытие фото с галереей
    const openPhotoModal = (photo: Photo) => {
        const allImages = [photo.main_image, ...(photo.gallery_images || [])];
        setAllPhotoImages(allImages);
        setCurrentPhotoIndex(0);
        setSelectedPhoto(photo);
    };

    // Выбор конкретного фото из галереи
    const selectPhoto = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentPhotoIndex(index);
    };

    // Пагинация для фото
    const getCurrentPhotos = (): Photo[] => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return photos.slice(startIndex, endIndex);
    };

    // Пагинация для видео
    const getCurrentVideos = (): Video[] => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return videos.slice(startIndex, endIndex);
    };

    const totalPagesPhotos = Math.ceil(photos.length / itemsPerPage);
    const totalPagesVideos = Math.ceil(videos.length / itemsPerPage);
    const totalPages = activeTab === 'photos' ? totalPagesPhotos : totalPagesVideos;
    const totalItems = activeTab === 'photos' ? photos.length : videos.length;

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return (
            <div className={styles.pagination}>
                <button
                    className={styles.paginationArrow}
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {startPage > 1 && (
                    <>
                        <button
                            className={styles.paginationItem}
                            onClick={() => goToPage(1)}
                        >
                            1
                        </button>
                        {startPage > 2 && <span className={styles.paginationDots}>...</span>}
                    </>
                )}

                {pages.map(page => (
                    <button
                        key={page}
                        className={`${styles.paginationItem} ${currentPage === page ? styles.active : ''}`}
                        onClick={() => goToPage(page)}
                    >
                        {page}
                    </button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className={styles.paginationDots}>...</span>}
                        <button
                            className={styles.paginationItem}
                            onClick={() => goToPage(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                <button
                    className={styles.paginationArrow}
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        );
    };

    if (loading) {
        return (
            <div className={`${styles.gallery} ${mobile.gallery}`}>
                <div className="container">
                    <div className={styles.loaderContainer}>
                        <Loading/>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${styles.gallery} ${mobile.gallery}`}>
                <div className="container">
                    <div className={styles.errorContainer}>
                        <div className={styles.errorIcon}>
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="16" r="1" fill="currentColor"/>
                            </svg>
                        </div>
                        <h2 className={styles.errorTitle}>Ошибка загрузки</h2>
                        <p className={styles.errorText}>{error}</p>
                        <button onClick={loadMedia} className={styles.retryBtn}>
                            Попробовать снова
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Получаем текущие элементы в зависимости от активной вкладки
    const currentPhotos = getCurrentPhotos();
    const currentVideos = getCurrentVideos();

    return (
        <div className={`${styles.gallery} ${mobile.gallery}`}>
            <div className="container">
                {/* Заголовок страницы */}
                <div className={styles.pageHeader}>
                    <div className={styles.pageTitleWrapper}>
                        <h1 className={styles.pageTitle}>
                            Медиа галерея
                        </h1>
                    </div>
                    <p className={styles.pageDescription}>
                        Фотографии и видео с мероприятий, экологических акций и трудовых будней предприятия
                    </p>
                </div>

                {/* Вкладки */}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'photos' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('photos')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                            <path d="M21 15l-5-4-3 3-4-4-5 5" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Фотографии
                        <span className={styles.tabCount}>{photos.length}</span>
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'videos' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('videos')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                            <polygon points="10 8 16 12 10 16" fill="currentColor"/>
                        </svg>
                        Видео
                        <span className={styles.tabCount}>{videos.length}</span>
                    </button>
                </div>

                {/* Фото галерея */}
                {activeTab === 'photos' && (
                    <div className={styles.photosSection}>
                        {currentPhotos.length > 0 ? (
                            <>
                                <div className={styles.photosGrid}>
                                    {currentPhotos.map((photo) => (
                                        <PhotoCard key={photo.id} photo={photo} />
                                    ))}
                                </div>
                                {renderPagination()}
                                <div className={styles.paginationInfo}>
                                    Показано {currentPhotos.length} из {totalItems} фотографий
                                </div>
                            </>
                        ) : (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyIcon}>
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
                                        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                                        <path d="M21 15l-5-4-3 3-4-4-5 5" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                </div>
                                <h3 className={styles.emptyTitle}>Фотографий пока нет</h3>
                                <p className={styles.emptyText}>Следите за обновлениями, скоро появятся новые фото</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Видео галерея */}
                {activeTab === 'videos' && (
                    <div className={styles.videosSection}>
                        {currentVideos.length > 0 ? (
                            <>
                                <div className={styles.videosGrid}>
                                    {currentVideos.map((video) => (
                                        <VideoCard key={video.id} video={video} />
                                    ))}
                                </div>
                                {renderPagination()}
                                <div className={styles.paginationInfo}>
                                    Показано {currentVideos.length} из {totalItems} видео
                                </div>
                            </>
                        ) : (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyIcon}>
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                                        <polygon points="10 8 16 12 10 16" fill="currentColor"/>
                                    </svg>
                                </div>
                                <h3 className={styles.emptyTitle}>Видео пока нет</h3>
                                <p className={styles.emptyText}>Следите за обновлениями, скоро появятся новые видео</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Модальное окно для фото с галереей */}
                {selectedPhoto && allPhotoImages.length > 0 && (
                    <div className={styles.modal} onClick={() => setSelectedPhoto(null)}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.modalClose} onClick={() => setSelectedPhoto(null)}>×</button>
                            
                            <div className={styles.modalImageWrapper}>
                                <img 
                                    src={allPhotoImages[currentPhotoIndex]}
                                    alt={`${selectedPhoto.title} - фото ${currentPhotoIndex + 1}`}
                                    className={styles.modalImage}
                                />
                                <div className={styles.imageCounter}>
                                    {currentPhotoIndex + 1} / {allPhotoImages.length}
                                </div>
                            </div>
                            
                            <div className={styles.modalInfo}>
                                <h3>{selectedPhoto.title}</h3>
                                <p>{selectedPhoto.description}</p>
                                <time>{formatDate(selectedPhoto.date || selectedPhoto.created_at)}</time>
                                
                                {allPhotoImages.length > 1 && (
                                    <div className={styles.modalGallery}>
                                        <h4>Все фото ({allPhotoImages.length})</h4>
                                        <div className={styles.modalGalleryList}>
                                            {allPhotoImages.map((img, index) => (
                                                <div 
                                                    key={index} 
                                                    className={`${styles.modalGalleryItem} ${currentPhotoIndex === index ? styles.active : ''}`}
                                                    onClick={(e) => selectPhoto(index, e)}
                                                >
                                                    <img src={img} alt={`Фото ${index + 1}`} />
                                                    <span>{index === 0 ? 'Главное' : `Фото ${index + 1}`}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Модальное окно для видео */}
                {selectedVideo && (
                    <VideoModal
                        isOpen={!!selectedVideo}
                        onClose={() => setSelectedVideo(null)}
                        videoUrl={selectedVideo.main_video_url}
                        title={selectedVideo.title}
                        galleryVideos={selectedVideo.gallery_videos}
                    />
                )}
            </div>
        </div>
    );
};