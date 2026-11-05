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
    // необязательные: id связывает подпись и ошибку с полем
    id?: string;
    maxLength?: number;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
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
    id,
    maxLength,
    onBlur,
}) => {
    const errorId = id && error ? `${id}-error` : undefined;

    return (
        <div className={styles.formGroup}>
            <label className={styles.label} htmlFor={id}>
                {label} {required && <span className={styles.required}>*</span>}
            </label>
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
                placeholder={placeholder}
                rows={rows}
                maxLength={maxLength}
                aria-invalid={error ? true : undefined}
                aria-describedby={errorId}
                className={`${styles.textarea} ${error ? styles.textareaError : ''}`}
            />
            {error && <span id={errorId} className={styles.error}>{error}</span>}
        </div>
    );
};
