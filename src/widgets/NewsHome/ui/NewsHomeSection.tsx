import styles from './NewsHomeSection.module.scss'
import { NewsHomeSectionBottom } from './components/NewsHomeSectionBottom'
import mobile from './NewsHomeSectionMobile.module.scss'
import { HomeSectionHeader } from '@/shared/ui/HomeSectionHeader'
import { getTranslations } from 'next-intl/server';
import { newsApi, getServerFetchOptions, type News } from '@/entities/news';

const LATEST_NEWS_COUNT = 4;

// Последние новости загружаются на сервере, чтобы сразу попасть в HTML главной страницы
const getLatestNews = async (): Promise<News[] | null> => {
    try {
        const { results } = await newsApi.getAll(
            { page: 1, page_size: LATEST_NEWS_COUNT },
            getServerFetchOptions()
        );
        return results;
    } catch (error) {
        console.error('Failed to prefetch latest news:', error);
        return null;
    }
};

export const NewsHomeSection = async () => {
    const [t, latestNews] = await Promise.all([getTranslations('Main'), getLatestNews()]);

    return (
        <section className={`${styles.newsHome} ${mobile.newsHome}`}>
            <div className="container">
                <div className={`${styles.newsHome__box} ${mobile.newsHome__box}`}>
                    <HomeSectionHeader
                        title={t('MainNewsTitle')}
                        buttonText={t('MainNewsButton')}
                        buttonLink="/news"
                    />
                    <NewsHomeSectionBottom initialNews={latestNews} />
                </div>
            </div>
        </section>
    )
}
