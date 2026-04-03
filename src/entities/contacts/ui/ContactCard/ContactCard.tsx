'use client'
import { useState } from 'react';
import styles from './ContactCard.module.scss';

interface ContactCardProps {
    icon: React.ReactNode;
    title: string;
    details: string[];
    link?: string;
    linkText?: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({ icon, title, details, link, linkText }) => {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className={styles.contactCard}>
            <div className={styles.contactIcon}>{icon}</div>
            <h4 className={styles.contactTitle}>{title}</h4>
            <div className={styles.contactDetails}>
                {details.map((detail, idx) => (
                    <div key={idx} className={styles.detailItem}>
                        <span className={styles.detailText}>{detail}</span>
                        <button
                            className={styles.copyBtn}
                            onClick={() => handleCopy(detail, `${title}-${idx}`)}
                            title="Скопировать"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </button>
                        {copiedField === `${title}-${idx}` && (
                            <span className={styles.copyTooltip}>Скопировано!</span>
                        )}
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