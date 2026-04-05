// widgets/procurement/ProcurementTable/ui/components/ErrorState/ErrorState.tsx
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
            <div className={styles.errorMessage}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
                </svg>
                <h3>Ошибка загрузки</h3>
                <p>{error}</p>
                <ButtonError variant="primary" onClick={onRetry}>
                    Попробовать снова
                </ButtonError>
            </div>
        </div>
    );
};