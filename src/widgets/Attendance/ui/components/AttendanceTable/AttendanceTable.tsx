'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Tabs } from '@/shared/ui/Tabs';
import { materialServices, transportServices } from '../../../model/attendance';
import { Attendance } from '../../../model/types'
import styles from './AttendanceTable.module.scss';

export const AttendanceTable: React.FC = () => {
    const t = useTranslations("Attendance");
    const [activeCategory, setActiveCategory] = useState<string>('material');

    const formatPrice = (price: number) => {
        return price.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const tabs = [
        { id: 'material', label: t('materialServices') },
        { id: 'transport', label: t('transportServices') },
    ];

    const currentServices: Attendance[] = activeCategory === 'material' ? materialServices : transportServices;

    return (
        <section className={styles.attendance}>
            <div className="container">
                <div className={styles.attendanceTable}>
                    <Tabs
                        tabs={tabs}
                        activeTab={activeCategory}
                        onTabChange={setActiveCategory}
                    />
        
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.numberCol}>№</th>
                                    <th className={styles.nameCol}>{t('serviceName')}</th>
                                    <th className={styles.unitCol}>{t('unit')}</th>
                                    <th className={styles.priceCol}>{t('price')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentServices.map((service, index) => (
                                    <tr key={`${activeCategory}-${service.id}`}>
                                        <td className={styles.numberCol}>{index + 1}</td>
                                        <td className={styles.nameCol}>{service.name}</td>
                                        <td className={styles.unitCol}>{service.unit}</td>
                                        <td className={styles.priceCol}>{formatPrice(service.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className={styles.note}>
                        <p>{t('note')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};