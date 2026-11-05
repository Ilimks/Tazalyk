import { useTranslations } from 'next-intl';
import { CircleAlert } from 'lucide-react';
import { ButtonError } from '@/shared/ui/Buttons/ButtonError';
import styles from './ErrorState.module.scss';

export interface ErrorStateProps {
    error: string;
    onRetry: () => void;
    title?: string;
    icon?: React.ReactNode;
    showIcon?: boolean;
    variant?: 'default' | 'compact' | 'fullscreen';
}

export const ErrorState: React.FC<ErrorStateProps> = ({
    error,
    onRetry,
    title,
    icon,
    showIcon = true,
    variant = "default"
}) => {
    const t = useTranslations('ErrorPage');

    return (
        <div className={`${styles.errorContainer} ${styles[variant]}`}>
            {showIcon && (
                <div className={styles.errorIcon}>
                    {icon || <CircleAlert size={64} strokeWidth={1.75} aria-hidden />}
                </div>
            )}
            <h2 className={styles.errorTitle}>{title ?? t('loadError')}</h2>
            <p className={styles.errorText}>{error}</p>
            <ButtonError variant="primary" onClick={onRetry}>
                {t('retry')}
            </ButtonError>
        </div>
    );
};
