import React from 'react';
import styles from './FormInput.module.scss';

interface FormInputProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'tel' | 'date' | 'password';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;
    error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    required = false,
    placeholder,
    error,
}) => {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>
                {label} {required && <span className={styles.required}>*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className={`${styles.input} ${error ? styles.inputError : ''}`}
            />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};