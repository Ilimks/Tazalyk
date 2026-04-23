import React from 'react';
import styles from './EmptyState.module.scss';

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    actionText?: string;
    onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    icon,
    actionText,
    onAction
}) => {
    return (
        <div className={styles.emptyState}>
            {icon || (
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                    <path d="M20 12v8H4v-8M12 2v10m-4-4l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="16" r="1" fill="currentColor"/>
                </svg>
            )}
            <h3 className={styles.title}>{title}</h3>
            {description && <p className={styles.description}>{description}</p>}
            {actionText && onAction && (
                <button onClick={onAction} className={styles.actionBtn}>
                    {actionText}
                </button>
            )}
        </div>
    );
};