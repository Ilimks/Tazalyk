'use client'
import { getAdditionalInfo } from '../model/tariffsData';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/shared/ui/PageHeader';
import { TariffsSection } from './components/TariffsSection';
import { InfoBox } from './components/InfoBox';

export const TariffsPage: React.FC = () => {
    const t = useTranslations("Tariffs");
    const additionalInfo = getAdditionalInfo(t);
    
    return (
        <>
            <PageHeader
                title={t('TariffsTitle')}
                description={t('TariffsDescription')}
                image="/assets/images/History5.webp"
                imagePosition="50% 62%"
            />

            <TariffsSection />

            <InfoBox 
                title={additionalInfo.title} 
                items={additionalInfo.items} 
            />
        </>
    )
}