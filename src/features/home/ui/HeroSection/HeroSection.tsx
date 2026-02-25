import styles from './HeroSection.module.scss'
import mobile from './HeroSectionMobile.module.scss'

export const HeroSection: React.FC = () => {

    return (
        <section className={`${styles.hero} ${mobile.hero}`}>
            <div className={styles.hero__video}>
                <video
                    className={`${styles.hero__video} ${mobile.hero__video}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                >
                    <source src="/assets/videos/heroVideo.MP4" type="video/mp4" />
                    <source src="/assets/videos/your-hero-video.webm" type="video/webm" />
                    Ваш браузер не поддерживает воспроизведение видео.
                </video>
                <div className={styles.hero__overlay}></div> 
            </div>
            <div className="container">
                <div className={`${styles.hero__box} ${mobile.hero__box}`}>
                    <h1 className={`${styles.hero__title} ${mobile.hero__title}`}>ТАЗАЛЫК</h1>
                    <p className={`${styles.hero__text} ${mobile.hero__text}`}>ЧИСТОТА ГОРОДА — ЕЖЕДНЕВНЫЙ ТРУД НА БЛАГО КАЖДОГО ЖИТЕЛЯ</p>
                    <button className={`${styles.hero__btn} ${mobile.hero__btn}`}>О КОМПАНИИ</button>
                </div>
            </div>
        </section>
    )
}