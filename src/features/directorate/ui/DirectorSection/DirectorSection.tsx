'use client'
import { DirectorCard, DirectorBio } from '@/entities/director'
import styles from './DirectorSection.module.scss'
import mobile from './DirectorSectionMobile.module.scss'

interface DirectorSectionProps {
    name: string;
    position: string;
    photoUrl: string;
    bio: string;
}

export const DirectorSection: React.FC<DirectorSectionProps> = ({ 
    name, 
    position, 
    photoUrl, 
    bio 
}) => {
    return (
        <div className={`${styles.directorSection} ${mobile.directorSection}`}>
            <div className={styles.directorSection__left}>
                <DirectorCard 
                    name={name}
                    position={position}
                    photoUrl={photoUrl}
                />
            </div>
            <div className={styles.directorSection__right}>
                <DirectorBio bio={bio} />
            </div>
        </div>
    )
}