'use client'
import { BriefcaseBusiness } from 'lucide-react';
import React, { useState } from 'react';
import { ProcurementItem } from '@/entities/procurement/model/types';
import { TableRow } from '../TableRow';
import styles from './TableBody.module.scss';
import { useTranslations } from 'next-intl';

interface TableBodyProps {
    data: ProcurementItem[];
}

export const TableBody: React.FC<TableBodyProps> = ({ data }) => {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const t = useTranslations("Procurement");

    const getTableWrapperClass = () => {
        if (data.length > 10) {
            return `${styles.tableWrapper} ${styles.tableWrapperScrollable}`;
        }
        return styles.tableWrapper;
    };

    if (data.length === 0) {
        return (
            <div className={styles.emptyState}>
                <BriefcaseBusiness size={64} strokeWidth={1.5} aria-hidden />
                <p>{t('ProcurementTableBodyNoData')}</p>
                <span>{t('ProcurementTableBodyDataTime')}</span>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={getTableWrapperClass()}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.purchaseNumberCol}>№</th>
                            <th>{t('ProcurementTableBodyContract')}</th>
                            <th>{t('ProcurementTableBodySupplier')}</th>
                            <th>{t('ProcurementTableBodyType')}</th>
                            <th>{t('ProcurementTableBodyMethod')}</th>
                            <th>{t('ProcurementTableBodyStatus')}</th>
                            <th>{t('ProcurementTableBodyDate')}</th>
                            <th>{t('ProcurementTableBodyContractAamount')}</th>
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
        </div>
    );
};