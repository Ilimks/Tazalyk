'use client'
import { DirectorSection } from '@/features/directorate'
import styles from './DirectorHomeSection.module.scss'
import mobile from './DirectorHomeSectionMobile.module.scss'
import { useTranslations } from 'next-intl';

export const DirectorHomeSection: React.FC = () => {
    const t = useTranslations("Main");
    
    const directorData = {
        name: 'Осмоналиев Женишбек Анарбекович',
        position: t('MainDirectorName'),
        bio: t('MainDirectorBiographyDescription')
    }

    return (
        <div className={`${styles.directorHomeWidget} ${mobile.directorHomeWidget}`}>
            <div className="container">
                <DirectorSection 
                    name={directorData.name}
                    position={directorData.position}
                    bio={directorData.bio}
                />
            </div>
        </div>
    )
}