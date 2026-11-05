'use client'
import { DirectorSection } from '@/features/directorate'
import styles from './DirectorHomeSection.module.scss'
import mobile from './DirectorHomeSectionMobile.module.scss'
import { useTranslations } from 'next-intl';

export const DirectorHomeSection: React.FC = () => {
    const t = useTranslations("Main");
    
    const directorData = {
        name: 'Арынов Максатбек Дуйшенкулович',
        position: t('MainDirectorName'),
        photoUrl: '/assets/images/DirectorPhoto1.webp',
        bio: t('MainDirectorBiographyDescription')
    }

    return (
        <div className={`${styles.directorHomeWidget} ${mobile.directorHomeWidget}`}>
            <div className="container">
                <DirectorSection 
                    name={directorData.name}
                    position={directorData.position}
                    photoUrl={directorData.photoUrl}
                    bio={directorData.bio}
                />
            </div>
        </div>
    )
}