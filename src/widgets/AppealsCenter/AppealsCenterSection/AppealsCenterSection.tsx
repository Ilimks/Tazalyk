import styles from './AppealsCenterSection.module.scss'
import { useTranslations } from 'next-intl';
import { Headset, Phone } from 'lucide-react';

const CALL_CENTER_NUMBER = '1400';
const CITY_NUMBER = '+996 (312) 34-51-02';

const Leaf: React.FC<{ className: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
        <path d="M6 114C2 54 44 6 116 4c2 70-44 116-110 110Z" />
        <path className={styles.appeals__leafVein} d="M6 114C36 78 66 46 96 22" />
    </svg>
);

export const AppealsCenterSection: React.FC = () => {
    const t = useTranslations("Main");
    return (
        <section className={styles.appeals}>
            <svg className={styles.appeals__waves} viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 120c180-60 360-70 560-30s380 70 560 30 240-60 320-50v150H0Z" />
                <path d="M0 170c220-50 420-40 640-10s420 40 800-30v90H0Z" />
            </svg>
            <Leaf className={`${styles.appeals__leaf} ${styles.appeals__leafLeft}`} />
            <Leaf className={`${styles.appeals__leaf} ${styles.appeals__leafRight}`} />

            <div className="container">
                <div className={styles.appeals__box}>
                    <div className={styles.appeals__up}>
                        <p className={styles.appeals__brand}>Тазалык</p>
                        <h2 className={styles.appeals__title}>{t('MainReceptionTitle')}</h2>
                    </div>

                    <div className={styles.appeals__numbers}>
                        <a
                            className={`${styles.appeals__card} ${styles.appeals__cardMain}`}
                            href={`tel:${CALL_CENTER_NUMBER}`}
                        >
                            <span className={styles.appeals__icon} aria-hidden="true">
                                <Headset />
                            </span>
                            <span className={styles.appeals__label}>{t('MainReceptionCallCenter')}</span>
                            <span className={styles.appeals__number}>{CALL_CENTER_NUMBER}</span>
                        </a>

                        <a className={styles.appeals__card} href="tel:+996312345102">
                            <span className={styles.appeals__icon} aria-hidden="true">
                                <Phone />
                            </span>
                            <span className={styles.appeals__label}>{t('MainReceptionCityNumber')}</span>
                            <span className={styles.appeals__number}>{CITY_NUMBER}</span>
                        </a>
                    </div>

                    <p className={styles.appeals__text}>{t('MainReceptionCall')}</p>
                </div>
            </div>
        </section>
    )
}
