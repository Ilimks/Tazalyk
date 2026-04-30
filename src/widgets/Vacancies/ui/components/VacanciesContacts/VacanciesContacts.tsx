'use client';
import { useTranslations } from 'next-intl';
import styles from './VacanciesContacts.module.scss';

interface ContactItem {
    icon: string;
    text: string;
}

export const VacanciesContacts: React.FC = () => {
    const t = useTranslations("Vacancies");

    const contacts: ContactItem[] = [
        { icon: '📍', text: 'г. Бишкек, ул. Ростовская 19б' },
        { icon: '📞', text: '+996 (312) 12-34-56' },
        { icon: '✉️', text: 'hr@tazalyk.kg' },
    ];

    return (
        <section>
            <div className="container">
                <div className={styles.contacts}>
                    <h3>{t('VacanciesContactsTitle')}</h3>
                    <p>{t('VacanciesContactsDescription')}</p>
                    <div className={styles.contactItems}>
                        {contacts.map((contact, index) => (
                            <div key={index} className={styles.contactItem}>
                                <span className={styles.contactIcon}>{contact.icon}</span>
                                <span>{contact.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};