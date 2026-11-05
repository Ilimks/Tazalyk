import styles from './NewsSearch.module.scss';
import { useTranslations } from 'next-intl';
import { InputNews } from '@/shared/ui/Inputs/InputNews';

interface NewsSearchProps {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
}

export const NewsSearch: React.FC<NewsSearchProps> = ({ value, onChange, onClear }) => {
    const t = useTranslations('News');

    return (
        <div className={styles.searchBar}>
            <InputNews
                value={value}
                onChange={onChange}
                onClear={onClear}
                placeholder={t('NewsSearchPlaceholder')}
            />
        </div>
    );
};