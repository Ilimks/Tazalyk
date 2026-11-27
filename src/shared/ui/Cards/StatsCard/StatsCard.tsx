'use client'
import { CountUp } from './CountUp'
import styles from './StatsCard.module.scss';
import { useTranslations } from 'next-intl';
import { COMPANY_FACTS } from '@/shared/config/site';

export const StatsCard: React.FC = () => {
    const t = useTranslations("History");

    return (
        <div className={styles.stats}>
            <div className={styles.stat}>
                <span className={styles.statNumber}><CountUp value={COMPANY_FACTS.years} suffix="+" /></span>
                <span className={styles.statLabel}>{t('HistoryStage4')}</span>
            </div>
            <div className={styles.stat}>
                <span className={styles.statNumber}><CountUp value={COMPANY_FACTS.vehicles} suffix="+" /></span>
                <span className={styles.statLabel}>{t('HistoryStage5')}</span>
            </div>
            <div className={styles.stat}>
                <span className={styles.statNumber}><CountUp value={COMPANY_FACTS.employees} suffix="+" /></span>
                <span className={styles.statLabel}>{t('HistoryStage6')}</span>
            </div>
        </div>
    )
}