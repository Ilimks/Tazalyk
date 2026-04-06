import styles from './AppealsCenterSection.module.scss'

export const AppealsCenterSection: React.FC = () => {
    return (
        <section className={styles.appeals}>
            <div className="container">
                <div className={styles.appeals__box}>
                    <div className={styles.appeals__up}>
                        <p className={styles.appeals__subtitle}>ЦЕНТР ПРИЁМА ОБРАЩЕНИЙ</p>
                        <p className={styles.appeals__title}>Тазалык</p>
                    </div>
                    <div className={styles.appeals__bottom}>
                        <h2 className={styles.appeals__number}>1980, (0312) 61-11-69</h2>
                        <p className={styles.appeals__text}>(звонок платный с мобильных номеров)</p>
                    </div>
                </div>
            </div>
        </section>
    )
}