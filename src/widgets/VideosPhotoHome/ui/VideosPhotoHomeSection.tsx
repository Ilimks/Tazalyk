import styles from './VideosPhotoHomeSection.module.scss'
import { VideosHomeSection } from './components/VideosHomeSection'
import mobile from './VideosPhotoHomeSectionMobile.module.scss'
import { PhotoHomeSection } from './components/PhotoHomeSection'
import { HomeSectionHeader } from '@/shared/ui/HomeSectionHeader'
import { useTranslations } from 'next-intl';

export const VideosPhotoHomeSection: React.FC = () => {
    const t = useTranslations("Main");
    return (
        <section className={`${styles.vidPhotoHome} ${mobile.vidPhotoHome}`}>
            <div className="container">
                <div className={`${styles.vidPhotoHome__box} ${mobile.vidPhotoHome__box}`}>
                    <HomeSectionHeader
                        title={t('MainVideosPhotosTitle')}
                        buttonText={t('MainVideosPhotosButton')}
                        buttonLink="/media"
                    />
                    <VideosHomeSection/>
                    <div className={`${styles.vidPhotoHome__box__line} ${mobile.vidPhotoHome__box__line}`}></div>
                    <PhotoHomeSection/>
                </div>
            </div>
        </section>
    )
}