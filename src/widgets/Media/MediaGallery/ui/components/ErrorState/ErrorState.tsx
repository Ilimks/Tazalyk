import React from 'react';
import { ButtonError } from '@/shared/ui/ButtonError';
import styles from './ErrorState.module.scss';

interface ErrorStateProps {
    error: string;
    onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
    return (
        <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="16" r="1" fill="currentColor"/>
                </svg>
            </div>
            <h2 className={styles.errorTitle}>Ошибка загрузки</h2>
            <p className={styles.errorText}>{error}</p>
            <ButtonError variant="primary" onClick={onRetry}>
                Попробовать снова
            </ButtonError>
        </div>
    );
};