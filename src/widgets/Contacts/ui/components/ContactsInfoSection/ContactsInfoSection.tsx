'use client';
import { ContactsInfo } from '@/features/contacts';
import styles from './ContactsInfoSection.module.scss';

export const ContactsInfoSection: React.FC = () => {
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