// widgets/procurement/ProcurementTable/ui/components/TableHeader/TableHeader.tsx
import React from 'react';
import { getPluralForm } from '@/shared/lib/utils/format';
import styles from './TableHeader.module.scss';

interface TableHeaderProps {
    totalCount: number;
    isLoading?: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ totalCount, isLoading = false }) => {
    if (isLoading) return null;
    
    return (
        <div className={styles.tableHeader}>
            <div className={styles.tableTitleWrapper}>
                <h2 className={styles.tableTitle}>Перечень закупок</h2>
                {totalCount > 0 && (
                    <span className={styles.tableCount}>
                        Всего: {totalCount} {getPluralForm(totalCount)}
                    </span>
                )}
            </div>
        </div>
    );
};