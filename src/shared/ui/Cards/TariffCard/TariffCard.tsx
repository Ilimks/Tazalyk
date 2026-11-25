'use client'
import { Clock } from 'lucide-react';
import styles from './TariffCard.module.scss';

export interface TariffRow {
    label: string;
    amount: number;
}

interface TariffCardProps {
    title: string;
    /** для кого тариф */
    caption: string;
    icon: React.ReactNode;
    rows: TariffRow[];
    totalLabel: string;
    total: number;
    note: string;
}

export const TariffCard: React.FC<TariffCardProps> = ({ title, caption, icon, rows, totalLabel, total, note }) => (
    <article data-reveal suppressHydrationWarning className={styles.tariffCard}>
        <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>{icon}</div>
            <div>
                <h2>{title}</h2>
                <p className={styles.caption}>{caption}</p>
            </div>
        </div>
        <div className={styles.tariffBody}>
            {/* сначала то, что платит житель, потом — из чего складывается */}
            <div className={styles.priceTotal}>
                <span className={styles.totalLabel}>{totalLabel}</span>
                <span className={styles.totalValue}>{total.toFixed(2)} сом</span>
            </div>
            {rows.map((row) => (
                <div key={row.label} className={styles.priceRow}>
                    <span className={styles.priceLabel}>{row.label}</span>
                    <span className={styles.priceValue}>{row.amount.toFixed(2)} сом</span>
                </div>
            ))}
            <div className={styles.tariffNote}>
                <Clock size={16} aria-hidden />
                <span>{note}</span>
            </div>
        </div>
    </article>
);
