'use client'
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
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <path d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.18A3 3 0 0 0 8.18 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="11" x2="12" y2="17" stroke="currentColor" strokeWidth="2"/>
                    <line x1="9" y1="14" x2="15" y2="14" stroke="currentColor" strokeWidth="2"/>
                </svg>
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