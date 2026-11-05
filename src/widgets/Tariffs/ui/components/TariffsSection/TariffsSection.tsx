'use client'
import { BadgePercent, User } from 'lucide-react';
import { TariffCard } from '@/shared/ui/Cards';
import styles from './TariffsSection.module.scss';
import { getIndividualTariffs } from '@/widgets/Tariffs/model/tariffsData';
import { useTranslations } from 'next-intl';

interface TariffType {
    id: number;
    title: string;
    icon: string;
    baseTariff: number;
    nsp: { rate: number; amount: number };
    total: number;
    unit: string;
    note: string;
}

const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
        user: <User size={32} aria-hidden />,
        star: <BadgePercent size={32} aria-hidden />,
    };
    return icons[iconName] || null;
};

export const TariffsSection: React.FC = () => {
    const t = useTranslations("Tariffs");
    const individualTariffs = getIndividualTariffs(t);

    return (
        <section>
            <div className="container">
                <div className={styles.tariffSection}>
                    <h2 className={styles.sectionTitle}>
                        <span>{t('TariffsIndividualTitle')}</span>
                    </h2>
                    <div className={styles.tariffGrid}>
                        {individualTariffs.map((tariff: TariffType) => (
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
            </div>
        </section>
    )
}