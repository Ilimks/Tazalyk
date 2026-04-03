import React from 'react';
import { Loading } from '@/shared/ui/Loading';
import styles from './LoadingState.module.scss';

export const LoadingState: React.FC = () => {
    return (
        <div className={styles.loaderContainer}>
            <Loading />
        </div>
    );
};