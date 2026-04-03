'use client'
import { DirectorateMember } from '../../model/directorateData';
import styles from './DirectorateCard.module.scss';

interface DirectorateCardProps {
    member: DirectorateMember;
    index: number;
}

export const DirectorateCard: React.FC<DirectorateCardProps> = ({ member, index }) => {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .slice(0, 2)
            .join('');
    };

    return (
        <div 
            className={styles.directorateCard} 
            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
        >
            <div className={styles.photoWrapper}>
                {member.photo ? (
                    <img 
                        src={member.photo} 
                        alt={member.name}
                        className={styles.photo}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const placeholder = document.createElement('div');
                            placeholder.className = styles.photoPlaceholder;
                            placeholder.innerHTML = `<span>${getInitials(member.name)}</span>`;
                            target.parentNode?.appendChild(placeholder);
                        }}
                    />
                ) : (
                    <div className={styles.photoPlaceholder}>
                        <span>{getInitials(member.name)}</span>
                    </div>
                )}
            </div>

            <div className={styles.cardBody}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <div className={styles.positionBadge}>
                    {member.position}
                </div>
                
                <div className={styles.receptionInfo}>
                    <div className={styles.receptionHeader}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8v4l3 3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className={styles.receptionTitle}>Прием граждан</span>
                    </div>
                    <div className={styles.receptionDetails}>
                        <div className={styles.receptionDay}>
                            <strong>День приема:</strong> {member.receptionDays}
                        </div>
                        <div className={styles.receptionTime}>
                            <strong>Время приема:</strong> {member.receptionTime}
                        </div>
                    </div>
                </div>

                <div className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div>
                            <span className={styles.contactLabel}>Запись по телефону</span>
                            <a href={`tel:${member.phone}`} className={styles.contactValue}>
                                {member.phone}
                            </a>
                        </div>
                    </div>

                    {member.email && (
                        <div className={styles.contactItem}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M22 6L12 13 2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <div>
                                <span className={styles.contactLabel}>Email</span>
                                <a href={`mailto:${member.email}`} className={styles.contactValue}>
                                    {member.email}
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};