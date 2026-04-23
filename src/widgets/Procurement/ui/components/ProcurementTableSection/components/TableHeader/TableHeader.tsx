import { getPluralForm } from '@/shared/lib/utils/format';
import styles from './TableHeader.module.scss';
import { useTranslations } from 'next-intl';

interface TableHeaderProps {
    totalCount: number;
    isLoading?: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ totalCount, isLoading = false }) => {
    const t = useTranslations("Procurement");

    if (isLoading) return null;
    
    return (
        <div className={styles.tableHeader}>
            <div className={styles.tableTitleWrapper}>
                <h2 className={styles.tableTitle}>{t('ProcurementTableHeaderTitle')}</h2>
                {totalCount > 0 && (
                    <span className={styles.tableCount}>
                        {t('ProcurementTableHeaderCount')} {totalCount} {getPluralForm(totalCount)}
                    </span>
                )}
            </div>
        </div>
    );
};