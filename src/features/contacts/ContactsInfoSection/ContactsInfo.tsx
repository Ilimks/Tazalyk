'use client'
import { ContactCard } from '@/entities/contacts';
import { useContactData } from '@/entities/contacts/model/contactsData';
import styles from './ContactsInfo.module.scss';
import { useTranslations } from 'next-intl';

const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
        phone: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/>
            </svg>
        ),
        email: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
            </svg>
        ),
        location: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
        ),
        schedule: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                <path d="M2 8h20" stroke="currentColor" strokeWidth="2"/>
            </svg>
        ),
        social: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
        )
    };
    return icons[iconName] || null;
};

export const ContactsInfo: React.FC = () => {
    const { contactItems } = useContactData();
    const t = useTranslations("Contacts");
    
    return (
        <div className={styles.contactInfo}>
            <div className={styles.infoHeader}>
                <h3 className={styles.infoTitle}>{t('ContactsDataTitle')}</h3>
                <p className={styles.infoDescription}>{t('ContactsDataDescription')}</p>
            </div>
            <div className={styles.contactGrid}>
                {contactItems.map((item) => (
                    <ContactCard
                        key={item.id}
                        icon={getIcon(item.icon)}
                        title={item.title}
                        details={item.details}
                        link={item.link}
                        linkText={item.linkText}
                    />
                ))}
            </div>
        </div>
    );
};