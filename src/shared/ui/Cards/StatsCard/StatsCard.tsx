'use client'
import styles from './StatsCard.module.scss';
import { useTranslations } from 'next-intl';

export const StatsCard: React.FC = () => {
    const t = useTranslations("History");

    return (
        <div className={styles.stats}>
            <div className={styles.stat}>
                <span className={styles.statNumber}>18+</span>
                <span className={styles.statLabel}>{t('HistoryStage4')}</span>
            </div>
            <div className={styles.stat}>
                <span className={styles.statNumber}>200+</span>
                <span className={styles.statLabel}>{t('HistoryStage5')}</span>
            </div>
            <div className={styles.stat}>
                <span className={styles.statNumber}>2000+</span>
                <span className={styles.statLabel}>{t('HistoryStage6')}</span>
            </div>
        </div>
    )
}