'use client'
import { DirectorateMember } from '@/widgets/Directorate/model';
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
            </div>
        </div>
    );
};