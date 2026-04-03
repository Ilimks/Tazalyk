'use client'
import styles from './TariffCard.module.scss';

interface TariffCardProps {
    title: string;
    icon: React.ReactNode;
    baseTariff: number;
    nsp: { rate: number; amount: number };
    total: number;
    note: string;
}

export const TariffCard: React.FC<TariffCardProps> = ({ title, icon, baseTariff, nsp, total, note }) => (
    <div className={styles.tariffCard}>
        <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>{icon}</div>
            <h3>{title}</h3>
        </div>
        <div className={styles.tariffBody}>
            <div className={styles.priceRow}>
                <span className={styles.priceLabel}>Базовый тариф:</span>
                <span className={styles.priceValue}>{baseTariff.toFixed(2)} сом</span>
            </div>
            <div className={styles.priceRow}>
                <span className={styles.priceLabel}>НСП ({nsp.rate}%):</span>
                <span className={styles.priceValue}>{nsp.amount.toFixed(2)} сом</span>
            </div>
            <div className={styles.priceTotal}>
                <span className={styles.totalLabel}>Итого с 1 человека:</span>
                <span className={styles.totalValue}>{total.toFixed(2)} сом</span>
            </div>
            <div className={styles.tariffNote}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8v4l3 3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>{note}</span>
            </div>
        </div>
    </div>
);