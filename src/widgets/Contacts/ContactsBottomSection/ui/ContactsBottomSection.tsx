'use client';
import { ContactsReception } from '@/features/contacts';
import { AdditionalInfo, additionalInfo } from '@/entities/contacts';
import styles from './ContactsBottomSection.module.scss';

export const ContactsBottomSection: React.FC = () => {
    return (
        <section className={styles.contactsBottomSection}>
            <div className="container">
                <ContactsReception />
                <div className={styles.additionalInfo}>
                    <AdditionalInfo title={additionalInfo.title} text={additionalInfo.text} />
                </div>
            </div>
        </section>
    );
};