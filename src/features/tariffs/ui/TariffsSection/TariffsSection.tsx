'use client'
import { TariffCard, individualTariffs } from '@/entities/tariffs';
import styles from './TariffsSection.module.scss';

const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
        user: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            </svg>
        ),
        star: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
        )
    };
    return icons[iconName] || null;
};

export const TariffsSection: React.FC = () => (
    <div className={styles.tariffSection}>
        <h2 className={styles.sectionTitle}>
            <span>Для физических лиц (население)</span>
        </h2>
        <div className={styles.tariffGrid}>
            {individualTariffs.map((tariff) => (
                <TariffCard
                    key={tariff.id}
                    title={tariff.title}
                    icon={getIcon(tariff.icon)}
                    baseTariff={tariff.baseTariff}
                    nsp={tariff.nsp}
                    total={tariff.total}
                    note={tariff.note}
                />
            ))}
        </div>
    </div>
);