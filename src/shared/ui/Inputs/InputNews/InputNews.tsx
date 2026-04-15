import styles from './InputNews.module.scss';

interface InputNewsProps {
    value: string;
    onChange: (value: string) => void;
    onClear?: () => void;
    placeholder?: string;
}

export const InputNews: React.FC<InputNewsProps> = ({ 
    value, 
    onChange, 
    onClear,
    placeholder = "Поиск новостей..." 
}) => {
    return (
        <div className={styles.inputContainer}>
            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={styles.input}
            />
            {value && onClear && (
                <button 
                    className={styles.clearButton}
                    onClick={onClear}
                    aria-label="Очистить"
                >
                    ×
                </button>
            )}
        </div>
    );
};