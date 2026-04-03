'use client'
import { receptionSchedule } from '@/entities/contacts';
import styles from './ContactsReception.module.scss';

export const ContactsReception: React.FC = () => (
    <div className={styles.reception}>
        <h3 className={styles.receptionTitle}>{receptionSchedule.title}</h3>
        <div className={styles.receptionTable}>
            <table>
                <thead>
                    <tr>
                        <th>День недели</th>
                        <th>Время приема</th>
                        <th>Кабинет</th>
                    </tr>
                </thead>
                <tbody>
                    {receptionSchedule.schedule.map((item, index) => (
                        <tr key={index}>
                            <td>{item.day}</td>
                            <td>{item.time}</td>
                            <td>{item.office}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className={styles.receptionNote}>
            <p>{receptionSchedule.note}</p>
            <p><strong>Адрес:</strong> {receptionSchedule.address}</p>
        </div>
    </div>
);