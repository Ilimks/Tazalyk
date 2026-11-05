import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
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
    placeholder
}) => {
    const t = useTranslations('News');
    const tCommon = useTranslations('Common');

    return (
        <div className={styles.inputContainer}>
            <Search className={styles.searchIcon} size={20} aria-hidden />
            <input
                type="text"
                placeholder={placeholder ?? t('NewsSearchPlaceholder')}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={styles.input}
            />
            {value && onClear && (
                <button
                    className={styles.clearButton}
                    onClick={onClear}
                    aria-label={tCommon('clear')}
                >
                    <X size={18} aria-hidden />
                </button>
            )}
        </div>
    );
};