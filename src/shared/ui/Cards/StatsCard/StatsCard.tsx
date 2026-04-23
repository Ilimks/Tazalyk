'use client'
import styles from './StatsCard.module.scss';

export const StatsCard: React.FC = () => (
    <div className={styles.stats}>
        <div className={styles.stat}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>лет работы</span>
        </div>
        <div className={styles.stat}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>единиц техники</span>
        </div>
        <div className={styles.stat}>
            <span className={styles.statNumber}>2000+</span>
            <span className={styles.statLabel}>сотрудников</span>
        </div>
    </div>
);