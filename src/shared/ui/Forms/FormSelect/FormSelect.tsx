import React from 'react';
import styles from './FormSelect.module.scss';

interface Option {
    value: string;
    label: string;
}

interface FormSelectProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    required?: boolean;
    error?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
    label,
    name,
    value,
    onChange,
    options,
    required = false,
    error,
}) => {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>
                {label} {required && <span className={styles.required}>*</span>}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`${styles.select} ${error ? styles.selectError : ''}`}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};