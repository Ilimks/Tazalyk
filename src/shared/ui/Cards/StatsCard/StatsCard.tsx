'use client'
import { CountUp } from './CountUp'
import styles from './StatsCard.module.scss';
import { useTranslations } from 'next-intl';

export const StatsCard: React.FC = () => {
    const t = useTranslations("History");

    return (
        <div className={styles.stats}>
            <div className={styles.stat}>
                <span className={styles.statNumber}><CountUp value={18} suffix="+" /></span>
                <span className={styles.statLabel}>{t('HistoryStage4')}</span>
            </div>
            <div className={styles.stat}>
                <span className={styles.statNumber}><CountUp value={200} suffix="+" /></span>
                <span className={styles.statLabel}>{t('HistoryStage5')}</span>
            </div>
            <div className={styles.stat}>
                <span className={styles.statNumber}><CountUp value={2000} suffix="+" /></span>
                <span className={styles.statLabel}>{t('HistoryStage6')}</span>
            </div>
        </div>
    )
}