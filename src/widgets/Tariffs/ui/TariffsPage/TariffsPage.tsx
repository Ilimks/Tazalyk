'use client'
import { TariffsHeader, TariffTable, InfoBox, pageHeader, summaryTable, additionalInfo } from '@/entities/tariffs';
import { TariffsSection, LegalTariff } from '@/features/tariffs';
import styles from './TariffsPage.module.scss';

const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
        building: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-6 9 6v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2"/>
            </svg>
        )
    };
    return icons[iconName] || null;
};

// Импортируем legalTariff из данных
import { legalTariff } from '@/entities/tariffs';

export const TariffsPage: React.FC = () => (
    <section className={styles.tariffs}>
        <div className="container">
            <TariffsHeader 
                title={pageHeader.title}
                description={pageHeader.description}
                documentInfo={pageHeader.documentInfo}
            />

            <TariffsSection />

            <LegalTariff
                title={legalTariff.title}
                icon={getIcon(legalTariff.icon)}
                baseTariff={legalTariff.baseTariff}
                vat={legalTariff.vat}
                nsp={legalTariff.nsp}
                total={legalTariff.total}
                note={legalTariff.note}
            />

            <TariffTable 
                title={summaryTable.title}
                columns={summaryTable.columns}
                rows={summaryTable.rows}
            />

            <div className={styles.additionalInfo}>
                <InfoBox title={additionalInfo.title} items={additionalInfo.items} />
            </div>
        </div>
    </section>
);