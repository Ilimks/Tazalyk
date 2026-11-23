'use client';
import { useTranslations } from 'next-intl';
import { CalendarDays, Clock, Info, MapPin, User, Phone } from 'lucide-react';
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
                                        {t('receptionDay')}
                                    </span>
                                    <span className={styles.value}>{employee.receptionDay}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>
                                        <Clock size={16} aria-hidden />
                                        {t('receptionTime')}
                                    </span>
                                    <span className={styles.value}>{employee.receptionTime}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>
                                        <MapPin size={16} aria-hidden />
                                        {t('address')}
                                    </span>
                                    <span className={styles.value}>{employee.address}</span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* одно примечание на всех: раньше оно повторялось в каждой карточке */}
                <div className={styles.note}>
                    <Info size={22} aria-hidden />
                    <p>{t('note')}</p>
                    <a className={styles.call} href="tel:+996312345102">
                        <Phone size={18} aria-hidden />
                        +996 (312) 34-51-02
                    </a>
                </div>
            </div>
        </section>
    );
};