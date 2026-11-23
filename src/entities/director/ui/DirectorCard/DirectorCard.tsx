'use client'
import Image from 'next/image'
import styles from './DirectorCard.module.scss'

interface DirectorCardProps {
    name: string;
    // пока фото нет, на его месте показываем инициалы
    photoUrl?: string;
}

const getInitials = (name: string) =>
    name
        .split(' ')
        .slice(0, 2)
        .map((word) => word[0])
        .join('');

export const DirectorCard: React.FC<DirectorCardProps> = ({ name, photoUrl }) => (
    <div className={styles.directorCard}>
        {photoUrl ? (
            <Image className={styles.directorCard__img} src={photoUrl} alt={name} width={600} height={720} priority />
        ) : (
            <div className={styles.directorCard__placeholder} role="img" aria-label={name}>
                {getInitials(name)}
            </div>
        )}
    </div>
)
