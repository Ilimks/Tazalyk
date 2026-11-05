'use client';
import { useTranslations } from 'next-intl';
import { CalendarDays, Clock, Info, MapPin, User } from 'lucide-react';
import styles from './EmployeeSchedule.module.scss';

export const EmployeeSchedule: React.FC = () => {
    const t = useTranslations("Employee");

    const employees = [
        {
            id: 1,
            name: t('director.name'),
            position: t('director.position'),
            receptionDay: t('director.day'),
            receptionTime: t('director.time'),
            address: t('director.address'),
        },
        {
            id: 2,
            name: t('deputy1.name'),
            position: t('deputy1.position'),
            receptionDay: t('deputy1.day'),
            receptionTime: t('deputy1.time'),
            address: t('deputy1.address'),
        },
        {
            id: 3,
            name: t('deputy2.name'),
            position: t('deputy2.position'),
            receptionDay: t('deputy2.day'),
            receptionTime: t('deputy2.time'),
            address: t('deputy2.address'),
        },
    ];

    return (
        <section className={styles.section}>
            <div className="container">

                <div className={styles.grid}>
                    {employees.map((employee) => (
                        <div key={employee.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.iconWrapper}>
                                    <User aria-hidden />
                                </div>
                                <div>
                                    <h3 className={styles.name}>{employee.name}</h3>
                                    <p className={styles.position}>{employee.position}</p>
                                </div>
                            </div>

                            <div className={styles.cardContent}>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>
                                        <CalendarDays size={16} aria-hidden />
                                        {t('receptionDay')}:
                                    </span>
                                    <span className={styles.value}>{employee.receptionDay}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>
                                        <Clock size={16} aria-hidden />
                                        {t('receptionTime')}:
                                    </span>
                                    <span className={styles.value}>{employee.receptionTime}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>
                                        <MapPin size={16} aria-hidden />
                                        {t('address')}:
                                    </span>
                                    <span className={styles.value}>{employee.address}</span>
                                </div>
                            </div>

                            <div className={styles.cardFooter}>
                                <div className={styles.noteIcon}>
                                    <Info size={16} aria-hidden />
                                </div>
                                <div className={styles.note}>{t('note')}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};