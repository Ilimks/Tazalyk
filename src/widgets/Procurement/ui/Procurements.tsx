import { PageHeader } from '@/shared/ui/PageHeader'
import { InfoCard } from '@/shared/ui/Cards'
import { useTranslations } from 'next-intl';
import { ProcurementTableSection } from './components/ProcurementTableSection'
import { ProcurementFilesSection } from './components/ProcurementFilesSection'

export const Procurements: React.FC = () => {
    const t = useTranslations("Procurement");

    return (
        <>
            <PageHeader
                title={t('ProcurementTitle')}
                description={t('ProcurementDescription')}
            />
            <InfoCard 
                title={t('ProcurementInfoCardTitle')}
                description={t('ProcurementInfoCardDescription')}
            />
            <ProcurementTableSection/>
            <ProcurementFilesSection/>
        </>
    )
}