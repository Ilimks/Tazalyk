// widgets/procurement/ProcurementTable/ui/components/TableBody/TableBody.tsx
import React, { useState } from 'react';
import { ProcurementItem } from '@/entities/procurement/model/types';
import { TableRow } from '../TableRow/TableRow';
import styles from './TableBody.module.scss';

interface TableBodyProps {
    data: ProcurementItem[];
}

export const TableBody: React.FC<TableBodyProps> = ({ data }) => {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    if (data.length === 0) {
        return (
            <div className={styles.emptyState}>
                <p>Нет данных о закупках</p>
            </div>
        );
    }

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.purchaseNumberCol}>№ п/п</th>
                        <th>№ контракта</th>
                        <th>Поставщик</th>
                        <th>Тип</th>
                        <th>Метод</th>
                        <th>Статус</th>
                        <th>Дата</th>
                        <th>Сумма договора</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <TableRow
                            key={item.id}
                            item={item}
                            index={index}
                            isHovered={hoveredRow === index}
                            onMouseEnter={() => setHoveredRow(index)}
                            onMouseLeave={() => setHoveredRow(null)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};