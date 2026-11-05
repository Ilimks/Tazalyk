'use client'
import styles from './DirectorBio.module.scss'
import mobile from './DirectorBioMobile.module.scss'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface DirectorBioProps {
    bio: string;
}

export const DirectorBio: React.FC<DirectorBioProps> = ({ bio }) => {
    const t = useTranslations('Main')

    return (
        <div className={`${styles.directorBio} ${mobile.directorBio}`}>
            <div className={styles.bgIcon}>
                <Image
                    src="/assets/icons/logo.svg"
                    alt="Logo"
                    fill
                    style={{ objectFit: 'contain', opacity: 0.12 }}
                />
            </div>
            <h3 className={`${styles.directorBio__title} ${mobile.directorBio__title}`}>
                {t('MainDirectorBiographyTitle')}
            </h3>
            <p className={`${styles.directorBio__text} ${mobile.directorBio__text}`}>
                {bio}
            </p>
        </div>
    )
}