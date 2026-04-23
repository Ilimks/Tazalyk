'use client';
import { NewsDetail } from '../NewsDetail';
import styles from './NewsDetailPage.module.scss';
import mobile from './NewsDetailPageMobile.module.scss';

interface NewsDetailPageProps {
    id: string;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ id }) => {
    return (
        <div className={`${styles.newsDetailPage} ${mobile.newsDetailPage}`}>
            <NewsDetail id={id} />
        </div>
    );
};