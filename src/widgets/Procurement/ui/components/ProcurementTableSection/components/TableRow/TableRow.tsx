import { Badge } from '@/shared/ui/Badge';
import { ProcurementItem } from '@/entities/procurement/model/types';
import { statusConfig } from '@/entities/procurement/model/types';
import { formatAmount } from '@/shared/lib/utils/format';
import { useTranslations } from 'next-intl';
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
    const t = useTranslations("Procurement");

    return (
        <tr 
            className={`${styles.tableRow} ${isHovered ? styles.hovered : ''}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <td className={styles.purchaseNumberCell}>
                {index + 1}
            </td>
            <td className={styles.contractNumber}>
                <span className={styles.contractLink}>{item.contractNumber}</span>
            </td>
            <td className={styles.supplier}>
                <div className={styles.supplierInfo}>
                    <span className={styles.supplierName}>{item.supplier}</span>
                </div>
            </td>
            <td data-label={t('ProcurementTableBodyType')}>{t(`ProcurementTypes.${item.type}`)}</td>
            <td data-label={t('ProcurementTableBodyMethod')}>{t(`ProcurementMethods.${item.method}`)}</td>
            <td data-label={t('ProcurementTableBodyStatus')}>
                <Badge
                    label={t(`ProcurementStatuses.${item.status}`)}
                    color={statusConfig[item.status].color}
                    backgroundColor={statusConfig[item.status].bg}
                    showDot={item.status === 'active'}
                />
            </td>
            <td className={styles.dateText} data-label={t('ProcurementTableBodyDate')}>
                <time dateTime={item.date}>{item.date.split('-').reverse().join('.')}</time>
            </td>
            <td className={styles.amountValue} data-label={t('ProcurementTableBodyContractAamount')}>
                <span>{formatAmount(item.amount)}</span>
            </td>
        </tr>
    );
};