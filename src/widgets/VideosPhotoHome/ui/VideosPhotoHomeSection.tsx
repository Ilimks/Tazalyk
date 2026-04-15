import styles from './VideosPhotoHomeSection.module.scss'
import { VideosHomeSection } from './components/VideosHomeSection'
import mobile from './VideosPhotoHomeSectionMobile.module.scss'
import { PhotoHomeSection } from './components/PhotoHomeSection'
import { HomeSectionHeader } from '@/shared/ui/HomeSectionHeader'

export const VideosPhotoHomeSection: React.FC = () => {
    return (
        <section className={`${styles.vidPhotoHome} ${mobile.vidPhotoHome}`}>
            <div className="container">
                <div className={`${styles.vidPhotoHome__box} ${mobile.vidPhotoHome__box}`}>
                    <HomeSectionHeader
                        title="Видеогалерея и Фотогалереля"
                        buttonText="Все видео и фото"
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