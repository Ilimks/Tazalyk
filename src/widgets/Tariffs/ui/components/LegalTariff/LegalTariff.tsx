'use client'
import { Clock } from 'lucide-react';
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
                                    <span className={styles.priceLabel}>{t('TariffsVat')} ({vat.rate}%):</span>
                                    <span className={styles.priceValue}>{vat.amount.toFixed(2)} сом</span>
                                </div>
                                <div className={styles.priceRow}>
                                    <span className={styles.priceLabel}>{t('TariffsNsp')} ({nsp.rate}%):</span>
                                    <span className={styles.priceValue}>{nsp.amount.toFixed(2)} сом</span>
                                </div>
                                <div className={styles.priceTotal}>
                                    <span className={styles.totalLabel}>{t('TariffsIndLegalCardTotal')}</span>
                                    <span className={styles.totalValue}>{total.toFixed(2)} сом</span>
                                </div>
                                <div className={styles.tariffNote}>
                                    <Clock size={16} aria-hidden />
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