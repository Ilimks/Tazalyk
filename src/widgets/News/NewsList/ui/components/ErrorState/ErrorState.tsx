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
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="16" r="1" fill="currentColor"/>
                </svg>
            </div>
            <p className={styles.errorText}>{error}</p>
            <button onClick={onRetry} className={styles.retryBtn}>
                Попробовать снова
            </button>
        </div>
    );
};