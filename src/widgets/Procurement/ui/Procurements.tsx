import { PageHeader } from '@/shared/ui/PageHeader'
import { InfoCard } from '@/shared/ui/Cards'
import { getTranslations } from 'next-intl/server';
import { getServerFetchOptions, type PageResult } from '@/shared/api';
import { procurementsApi, type ProcurementItem } from '@/entities/procurement';
import { ProcurementTableSection } from './components/ProcurementTableSection'
import { ProcurementFilesSection } from './components/ProcurementFilesSection'

const PROCUREMENTS_PER_PAGE = 100;

const getInitialProcurements = async (): Promise<PageResult<ProcurementItem> | null> => {
    try {
        return await procurementsApi.getAll(1, PROCUREMENTS_PER_PAGE, getServerFetchOptions());
    } catch (error) {
        // если API недоступен, таблица загрузится в браузере и покажет ошибку с кнопкой повтора
        console.error('Failed to prefetch procurements:', error);
        return null;
    }
};

// Первая страница закупок загружается на сервере — таблица сразу есть в HTML для поисковиков
export const Procurements = async () => {
    const [t, initialProcurements] = await Promise.all([
        getTranslations("Procurement"),
        getInitialProcurements(),
    ]);

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
            <ProcurementTableSection
                itemsPerPage={PROCUREMENTS_PER_PAGE}
                initialData={initialProcurements}
            />
            <ProcurementFilesSection/>
        </>
    )
}