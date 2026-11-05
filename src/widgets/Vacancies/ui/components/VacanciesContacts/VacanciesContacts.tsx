'use client';
import { useTranslations } from 'next-intl';
import { Mail, MapPin, type LucideIcon } from 'lucide-react';
import { HR_EMAIL } from '../../../model/contacts';
import styles from './VacanciesContacts.module.scss';

interface ContactItem {
    icon: LucideIcon;
    text: string;
}

export const VacanciesContacts: React.FC = () => {
    const t = useTranslations("Vacancies");

    const contacts: ContactItem[] = [
        { icon: MapPin, text: t('VacanciesContactsAddress') },
        { icon: Mail, text: HR_EMAIL },
    ];

    return (
        <section>
            <div className="container">
                <div className={styles.contacts}>
                    <h3>{t('VacanciesContactsTitle')}</h3>
                    <p>{t('VacanciesContactsDescription')}</p>
                    <div className={styles.contactItems}>
                        {contacts.map(({ icon: Icon, text }, index) => (
                            <div key={index} className={styles.contactItem}>
                                <span className={styles.contactIcon}>
                                    <Icon size={18} aria-hidden />
                                </span>
                                <span>{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};