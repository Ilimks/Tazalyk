'use client';
import { PageHeader } from '@/shared/ui/PageHeader';
import { ContactsInfo } from '@/features/contacts';
import styles from './ContactsInfoSection.module.scss';

export const ContactsInfoSection: React.FC = () => {
    return (
        <section className={styles.contactsMainInfo}>
            <div className="container">
                <PageHeader 
                    title="Контакты" 
                    description="Свяжитесь с нами для получения дополнительной информации о деятельности муниципального предприятия 'Тазалык'" 
                />
                <div className={styles.contactInfoSection}>
                    <ContactsInfo />
                </div>
            </div>
        </section>
    );
};