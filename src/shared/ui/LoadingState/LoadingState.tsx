import React from 'react';
import { Loading } from '@/shared/ui/Loading';
import styles from './LoadingState.module.scss';

export const LoadingState: React.FC = () => {
    return (
        <div className={styles.loaderContainer}>
            <Loading size="40px" color="#22c55e" speed={2} />
        </div>
    );
};