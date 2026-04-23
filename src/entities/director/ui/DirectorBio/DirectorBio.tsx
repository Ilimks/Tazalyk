'use client'
import styles from './DirectorBio.module.scss'
import mobile from './DirectorBioMobile.module.scss'

interface DirectorBioProps {
    bio: string;
}

export const DirectorBio: React.FC<DirectorBioProps> = ({ bio }) => {

    return (
        <div className={`${styles.directorBio} ${mobile.directorBio}`}>
            <h3 className={`${styles.directorBio__title} ${mobile.directorBio__title}`}>
                Биография
            </h3>
            <p className={`${styles.directorBio__text} ${mobile.directorBio__text}`}>
                {bio}
            </p>
        </div>
    )
}