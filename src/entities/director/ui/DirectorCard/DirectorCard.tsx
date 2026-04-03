'use client'
import Image from 'next/image'
import styles from './DirectorCard.module.scss'
import mobile from './DirectorCardMobile.module.scss'

interface DirectorCardProps {
    name: string;
    position: string;
    photoUrl: string;
}

export const DirectorCard: React.FC<DirectorCardProps> = ({ name, position, photoUrl }) => {
    return (
        <div className={`${styles.directorCard} ${mobile.directorCard}`}>
            <h3 className={`${styles.directorCard__position} ${mobile.directorCard__position}`}>
                {position}
            </h3>
            <div className={styles.imageWrapper}>
                <Image
                    className={`${styles.directorCard__img} ${mobile.directorCard__img}`}
                    src={photoUrl}
                    alt={name}
                    width={320}
                    height={410}
                    priority
                />
            </div>
            <h3 className={`${styles.directorCard__name} ${mobile.directorCard__name}`}>
                {name}
            </h3>
        </div>
    )
}