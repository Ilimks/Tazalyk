import styles from './VideosPhotoHomeSection.module.scss'
import { VideosHomeSection } from './VideosHomeSection/VideosHomeSection'
import mobile from './VideosPhotoHomeSectionMobile.module.scss'
import { VideosPhotoHomeSectionUp } from './VideosPhotoHomeSectionUp/VideosPhotoHomeSectionUp'
import { PhotoHomeSection } from './PhotoHomeSection/PhotoHomeSection'

export const VideosPhotoHomeSection: React.FC = () => {
    return (
        <section className={`${styles.vidPhotoHome} ${mobile.vidPhotoHome}`}>
            <div className="container">
                <div className={`${styles.vidPhotoHome__box} ${mobile.vidPhotoHome__box}`}>
                    <VideosPhotoHomeSectionUp/>
                    <VideosHomeSection/>
                    <div className={`${styles.vidPhotoHome__box__line} ${mobile.vidPhotoHome__box__line}`}></div>
                    <PhotoHomeSection/>
                </div>
            </div>
        </section>
    )
}