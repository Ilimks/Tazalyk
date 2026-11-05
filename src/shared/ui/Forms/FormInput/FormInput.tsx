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
    // необязательные: id связывает подпись, подсказку и ошибку с полем
    id?: string;
    hint?: string;
    maxLength?: number;
    autoComplete?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
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
    id,
    hint,
    maxLength,
    autoComplete,
    inputMode,
    onBlur,
}) => {
    const hintId = id && hint ? `${id}-hint` : undefined;
    const errorId = id && error ? `${id}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

    return (
        <div className={styles.formGroup}>
            <label className={styles.label} htmlFor={id}>
                {label} {required && <span className={styles.required}>*</span>}
            </label>
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
                placeholder={placeholder}
                maxLength={maxLength}
                autoComplete={autoComplete}
                inputMode={inputMode}
                aria-invalid={error ? true : undefined}
                aria-describedby={describedBy}
                className={`${styles.input} ${error ? styles.inputError : ''}`}
            />
            {hint && <span id={hintId} className={styles.hint}>{hint}</span>}
            {error && <span id={errorId} className={styles.error}>{error}</span>}
        </div>
    );
};
