'use client';
import { ContactsMap } from '@/features/contacts';
import styles from './ContactsMapSection.module.scss';

export const ContactsMapSection: React.FC = () => {
    return (
        <section className={styles.contactsMapSection}>
            <div className="container">
                <div className={styles.mapSection}>
                    <ContactsMap />
                </div>
            </div>
        </section>
    );
};