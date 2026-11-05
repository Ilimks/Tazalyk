import { NewsList } from '../components/NewsList';
import { newsApi, getServerFetchOptions, type PaginatedNewsResponse } from '@/entities/news';
import styles from './NewsPage.module.scss';

const NEWS_PER_PAGE = 12;

// Первая страница новостей загружается на сервере — она сразу есть в HTML для поисковиков
export const NewsPage = async () => {
    let initialData: PaginatedNewsResponse | null = null;
    try {
        initialData = await newsApi.getAll(
            { page: 1, page_size: NEWS_PER_PAGE },
            getServerFetchOptions()
        );
    } catch (error) {
        // если API недоступен, список загрузится в браузере и покажет ошибку с кнопкой повтора
        console.error('Failed to prefetch news:', error);
    }

    return (
        <div className={styles.newsPage}>
            <NewsList itemsPerPage={NEWS_PER_PAGE} initialData={initialData} />
        </div>
    );
};
