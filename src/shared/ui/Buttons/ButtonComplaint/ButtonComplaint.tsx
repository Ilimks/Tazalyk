'use client';
import styles from './ButtonComplaint.module.scss';

interface ButtonComplaintProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    children: React.ReactNode;
    className?: string;
}

export const ButtonComplaint: React.FC<ButtonComplaintProps> = ({
    type = 'button',
    onClick,
    disabled = false,
    isLoading = false,
    children,
    className = '',
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${styles.submitBtn} ${className}`}
        >
            {isLoading ? (
                <>
                    <span className={styles.spinner}></span>
                    {children}
                </>
            ) : (
                children
            )}
        </button>
    );
};