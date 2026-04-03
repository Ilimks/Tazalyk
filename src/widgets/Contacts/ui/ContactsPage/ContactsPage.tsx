'use client'
import { ContactsHeader, AdditionalInfo, pageHeader, additionalInfo } from '@/entities/contacts';
import { ContactsInfo, ContactsMap, ContactsReception } from '@/features/contacts';
import styles from './ContactsPage.module.scss';

export const ContactsPage: React.FC = () => (
    <section className={styles.contacts}>
        <div className="container">
            <ContactsHeader title={pageHeader.title} description={pageHeader.description} />

            <div className={styles.contactWrapper}>
                <div className={styles.contactInfoSection}>
                    <ContactsInfo />
                </div>
                <div className={styles.mapSection}>
                    <ContactsMap />
                </div>
            </div>

            <ContactsReception />

            <div className={styles.additionalInfo}>
                <AdditionalInfo title={additionalInfo.title} text={additionalInfo.text} />
            </div>
        </div>
    </section>
);