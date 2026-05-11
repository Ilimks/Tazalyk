import styles from './ContactCard.module.scss';

interface ContactCardProps {
    icon: React.ReactNode;
    title: string;
    details: string[];
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
                        <span className={styles.detailText}>{detail}</span>
                    </div>
                ))}
            </div>
            {link && linkText && (
                <a href={link} className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                    {linkText}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
            )}
        </div>
    );
};