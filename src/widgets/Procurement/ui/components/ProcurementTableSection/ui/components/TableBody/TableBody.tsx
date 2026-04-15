// widgets/procurement/ProcurementTable/ui/components/TableBody/TableBody.tsx
import React, { useState, useEffect } from 'react';
import { ProcurementItem } from '@/entities/procurement/model/types';
import { TableRow } from '../TableRow/TableRow';
import { Pagination } from '@/shared/ui/Pagination';
import styles from './TableBody.module.scss';

interface TableBodyProps {
    data: ProcurementItem[];
    itemsPerPage?: number;
}

export const TableBody: React.FC<TableBodyProps> = ({ data, itemsPerPage = 5 }) => {
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Сбрасываем страницу при изменении данных
    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    // Пагинация
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    const goToPage = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (data.length === 0) {
        return (
            <div className={styles.emptyState}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <path d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.18A3 3 0 0 0 8.18 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="11" x2="12" y2="17" stroke="currentColor" strokeWidth="2"/>
                    <line x1="9" y1="14" x2="15" y2="14" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <p>Нет данных о закупках</p>
                <span>Данные будут добавлены в ближайшее время</span>
            </div>
        );
    }

    return (
        <div className={styles.container}>
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
                        {currentData.map((item, index) => (
                            <TableRow
                                key={item.id}
                                item={item}
                                index={startIndex + index}
                                isHovered={hoveredRow === index}
                                onMouseEnter={() => setHoveredRow(index)}
                                onMouseLeave={() => setHoveredRow(null)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            
            {totalPages > 1 && (
                <div className={styles.paginationWrapper}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goToPage}
                        totalItems={data.length}
                        currentItemsCount={currentData.length}
                    />
                </div>
            )}
        </div>
    );
};