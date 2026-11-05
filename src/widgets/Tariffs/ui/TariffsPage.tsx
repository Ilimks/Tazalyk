'use client'
import { BuildingComplex } from 'lucide-react';
import { getSummaryTable, getAdditionalInfo, getLegalTariff } from '../model/tariffsData';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/shared/ui/PageHeader';
import { TariffsSection } from './components/TariffsSection';
import { LegalTariff } from './components/LegalTariff';
import { TariffTable } from './components/TariffTable';
import { InfoBox } from './components/InfoBox';

const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
        building: <BuildingComplex size={32} aria-hidden />,
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