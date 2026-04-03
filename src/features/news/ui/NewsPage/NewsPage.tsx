'use client';
import React from 'react';
import { NewsList } from '@/widgets/News/NewsList/ui/NewsList';
import styles from './NewsPage.module.scss';

export const NewsPage: React.FC = () => {
    return (
        <div className={styles.newsPage}>
            <NewsList />
        </div>
    );
};