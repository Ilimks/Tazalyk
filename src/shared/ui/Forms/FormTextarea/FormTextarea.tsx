import React from 'react';
import styles from './FormTextarea.module.scss';

interface FormTextareaProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    placeholder?: string;
    rows?: number;
    error?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
    label,
    name,
    value,
    onChange,
    required = false,
    placeholder,
    rows = 4,
    error,
}) => {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>
                {label} {required && <span className={styles.required}>*</span>}
            </label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                rows={rows}
                className={`${styles.textarea} ${error ? styles.textareaError : ''}`}
            />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};