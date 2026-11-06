import { ArrowUpRight } from 'lucide-react';
import styles from './ContactCard.module.scss';

// строка карточки: обычный текст или ссылка, например номер телефона
type ContactDetail = string | { text: string; href: string };

interface ContactCardProps {
    icon: React.ReactNode;
    title: string;
    details: ContactDetail[];
    link?: string;
    linkText?: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({ icon, title, details, link, linkText }) => {

    return (
        <div className={styles.contactCard}>
            <div className={styles.contactIcon}>{icon}</div>
            <h4 className={styles.contactTitle}>{title}</h4>
            <div className={styles.contactDetails}>
                {details.map((detail, idx) => (
                    <div key={idx} className={styles.detailItem}>
                        {typeof detail === 'string' ? (
                            <span className={styles.detailText}>{detail}</span>
                        ) : (
                            <a href={detail.href} className={styles.detailLink}>{detail.text}</a>
                        )}
                    </div>
                ))}
            </div>
            {link && linkText && (
                <a href={link} className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                    {linkText}
                    <ArrowUpRight size={16} aria-hidden />
                </a>
            )}
        </div>
    );
};