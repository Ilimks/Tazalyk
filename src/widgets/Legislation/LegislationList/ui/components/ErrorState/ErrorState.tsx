import React from 'react';
import styles from './ErrorState.module.scss';

interface ErrorStateProps {
    error: string;
    onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
    return (
        <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
                </svg>
            </div>
            <h3>Ошибка загрузки</h3>
            <p>{error}</p>
            <button onClick={onRetry} className={styles.retryBtn}>
                Попробовать снова
            </button>
        </div>
    );
};