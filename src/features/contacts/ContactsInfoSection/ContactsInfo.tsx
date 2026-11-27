import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { ContactCard } from '@/entities/contacts';
import { useContactData } from '@/entities/contacts/model/contactsData';
import styles from './ContactsInfo.module.scss';
import { useTranslations } from 'next-intl';

const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
        phone: <Phone size={24} aria-hidden />,
        email: <Mail size={24} aria-hidden />,
        location: <MapPin size={24} aria-hidden />,
        schedule: <Clock size={24} aria-hidden />,
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