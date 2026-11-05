import styles from './NewsStats.module.scss';
import { useTranslations } from 'next-intl';

interface NewsStatsProps {
    count: number;
    hasFilters: boolean;
    searchQuery?: string;
    selectedYear?: string;
}

export const NewsStats: React.FC<NewsStatsProps> = ({
    count,
    hasFilters,
    searchQuery,
    selectedYear
}) => {
    const t = useTranslations('News');

    const getTitle = () => {
        if (searchQuery) return t('NewsSearchResults', { query: searchQuery });
        if (selectedYear && selectedYear !== 'all') return t('NewsOfYear', { year: selectedYear });
        return t('NewsAll');
    };

    return (
        <div className={styles.newsStats}>
            <h2 className={styles.newsStatsTitle}>{getTitle()}</h2>
            <span className={styles.newsStatsCount}>
                {t('NewsCount', { count })}
            </span>
        </div>
    );
};