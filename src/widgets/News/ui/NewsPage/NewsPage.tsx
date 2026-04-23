'use client';
import { NewsList } from '../components/NewsList';
import styles from './NewsPage.module.scss';

export const NewsPage: React.FC = () => {
    return (
        <div className={styles.newsPage}>
            <NewsList />
        </div>
    );
};