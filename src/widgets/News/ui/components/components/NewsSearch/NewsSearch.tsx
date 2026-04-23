// NewsSearch.tsx
import styles from './NewsSearch.module.scss';
import { InputNews } from '@/shared/ui/Inputs/InputNews';

interface NewsSearchProps {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
}

export const NewsSearch: React.FC<NewsSearchProps> = ({ value, onChange, onClear }) => {
    return (
        <div className={styles.searchBar}>
            <InputNews 
                value={value}
                onChange={onChange}
                onClear={onClear}
                placeholder="Поиск новостей..."
            />
        </div>
    );
};