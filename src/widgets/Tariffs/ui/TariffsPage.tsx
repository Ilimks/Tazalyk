'use client'
import { getSummaryTable, getAdditionalInfo, getLegalTariff } from '../model/tariffsData';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/shared/ui/PageHeader';
import { TariffsSection } from './components/TariffsSection';
import { LegalTariff } from './components/LegalTariff';
import { TariffTable } from './components/TariffTable';
import { InfoBox } from './components/InfoBox';

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

export const TariffsPage: React.FC = () => {
    const t = useTranslations("Tariffs");
    const legalTariff = getLegalTariff(t);
    const summaryTable = getSummaryTable(t);
    const additionalInfo = getAdditionalInfo(t);
    
    return (
        <>
            <PageHeader
                title={t('TariffsTitle')}
                description={t('TariffsDescription')}
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
                unit={legalTariff.unit}
            />

            <TariffTable
                title={summaryTable.title}
                columns={summaryTable.columns}
                rows={summaryTable.rows}
            />

            <InfoBox 
                title={additionalInfo.title} 
                items={additionalInfo.items} 
            />
        </>
    )
}