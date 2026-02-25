import styles from './VideosHomeSection.module.scss'
import mobile from './VideosHomeSectionMobile.module.scss'

export const VideosHomeSection: React.FC = () => {
    return (
        <section className={`${styles.videosHome} ${mobile.videosHome}`}>
            <div className="container">
                <div className={`${styles.videosHome__box} ${mobile.videosHome__box}`}>
                    
                </div>
            </div>
        </section>
    )
}