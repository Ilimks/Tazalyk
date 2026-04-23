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
        photoUrl: '/assets/images/DirectorPhoto1.jpeg',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
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