// widgets/procurement/ProcurementTable/ui/components/TableRow/TableRow.tsx
import React from 'react';
import { Badge } from '@/shared/ui/Badge';
import { ProcurementItem } from '@/entities/procurement/model/types';
import { typeConfig, methodConfig, statusConfig } from '@/shared/config/procurement';
import { formatAmount } from '@/shared/lib/utils/format';
import styles from './TableRow.module.scss';

interface TableRowProps {
    item: ProcurementItem;
    index: number;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export const TableRow: React.FC<TableRowProps> = ({
    item,
    index,
    isHovered,
    onMouseEnter,
    onMouseLeave
}) => {
    return (
        <tr 
            className={`${styles.tableRow} ${isHovered ? styles.hovered : ''}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <td className={styles.purchaseNumberCell}>
                <span className={styles.purchaseNumberBadge}>
                    {index + 1}
                </span>
            </td>
            <td className={styles.contractNumber}>
                <span className={styles.contractLink}>{item.contractNumber}</span>
            </td>
            <td className={styles.supplier}>
                <div className={styles.supplierInfo}>
                    <span className={styles.supplierName}>{item.supplier}</span>
                </div>
            </td>
            <td>
                <Badge
                    label={typeConfig[item.type].label}
                    color={typeConfig[item.type].color}
                    backgroundColor={typeConfig[item.type].bg}
                />
            </td>
            <td>
                <Badge
                    label={methodConfig[item.method].label}
                    color={methodConfig[item.method].color}
                    backgroundColor={methodConfig[item.method].bg}
                />
            </td>
            <td>
                <Badge
                    label={statusConfig[item.status].label}
                    color={statusConfig[item.status].color}
                    backgroundColor={statusConfig[item.status].bg}
                    showDot={item.status === 'active'}
                />
            </td>
            <td className={styles.dateText}>
                <span>{item.date}</span>
            </td>
            <td className={styles.amountValue}>
                <span>{formatAmount(item.amount)}</span>
            </td>
        </tr>
    );
};