import React from 'react';
import { News } from '@/entities/news/model/types';
import { NewsCard } from '@/entities/news/ui/NewsCard';
import styles from './NewsGrid.module.scss';

interface NewsGridProps {
    news: News[];
}

export const NewsGrid: React.FC<NewsGridProps> = ({ news }) => {
    return (
        <div className={styles.newsGrid}>
            {news.map((item) => (
                <NewsCard key={item.id} news={item} variant="compact" />
            ))}
        </div>
    );
};