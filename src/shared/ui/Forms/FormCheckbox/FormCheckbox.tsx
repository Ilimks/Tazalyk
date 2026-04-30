import React from 'react';
import styles from './FormCheckbox.module.scss';

interface FormCheckboxProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    error?: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
    label,
    name,
    checked,
    onChange,
    required = false,
    error,
}) => {
    return (
        <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    required={required}
                    className={styles.checkbox}
                />
                <span className={styles.labelText}>
                    {label} {required && <span className={styles.required}>*</span>}
                </span>
            </label>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};