'use client'
import { BadgePercent, BuildingComplex, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { TariffCard } from '@/shared/ui/Cards';
import { getTariffs } from '@/widgets/Tariffs/model/tariffsData';
import styles from './TariffsSection.module.scss';

const ICONS: Record<string, React.ReactNode> = {
    user: <User size={32} aria-hidden />,
    star: <BadgePercent size={32} aria-hidden />,
    building: <BuildingComplex size={32} aria-hidden />,
};

export const TariffsSection: React.FC = () => {
    const t = useTranslations("Tariffs");

    return (
        <section className={styles.tariffs}>
            <div className="container">
                <div className={styles.tariffGrid}>
                    {getTariffs(t).map(({ id, icon, ...tariff }) => (
                        <TariffCard key={id} icon={ICONS[icon]} {...tariff} />
                    ))}
                </div>
            </div>
        </section>
    );
};
