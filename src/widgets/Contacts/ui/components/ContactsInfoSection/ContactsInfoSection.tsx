'use client';
import { ContactsInfo } from '@/features/contacts';
import styles from './ContactsInfoSection.module.scss';
import { useTranslations } from 'next-intl';

export const ContactsInfoSection: React.FC = () => {
    const t = useTranslations("Contacts");

    return (
        <section className={styles.contactsMainInfo}>
            <div className="container">
                <div className={styles.contactInfoSection}>
                    <ContactsInfo />
                </div>
            </div>
        </section>
    );
};