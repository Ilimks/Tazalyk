'use client'
import styles from './LegalTariff.module.scss';
import { useTranslations } from 'next-intl';

interface LegalTariffProps {
    title: string;
    icon: React.ReactNode;
    baseTariff: number;
    vat: { rate: number; amount: number };
    nsp: { rate: number; amount: number };
    total: number;
    note: string;
    unit: string;
}

export const LegalTariff: React.FC<LegalTariffProps> = ({ title, icon, baseTariff, vat, nsp, total, note }) => {
    const t = useTranslations("Tariffs");

    return (
        <section>
            <div className="container">
                <div className={styles.tariffSection}>
                    <h2 className={styles.sectionTitle}>
                        <span>{t('TariffsIndLegalTitle')}</span>
                    </h2>
                    <div className={styles.legalTariff}>
                        <div className={styles.tariffCardLarge}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>{icon}</div>
                                <h3>{title}</h3>
                            </div>
                            <div className={styles.tariffBody}>
                                <div className={styles.priceRow}>
                                    <span className={styles.priceLabel}>{t('TariffsTableCardBase')}</span>
                                    <span className={styles.priceValue}>{baseTariff.toFixed(2)} сом</span>
                                </div>
                                <div className={styles.priceRow}>
                                    <span className={styles.priceLabel}>НДС ({vat.rate}%):</span>
                                    <span className={styles.priceValue}>{vat.amount.toFixed(2)} сом</span>
                                </div>
                                <div className={styles.priceRow}>
                                    <span className={styles.priceLabel}>НСП ({nsp.rate}%):</span>
                                    <span className={styles.priceValue}>{nsp.amount.toFixed(2)} сом</span>
                                </div>
                                <div className={styles.priceTotal}>
                                    <span className={styles.totalLabel}>{t('TariffsIndLegalCardTotal')}</span>
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
                    </div>
                </div>
            </div>
        </section>
    )
}