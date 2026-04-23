'use client'
import { directorateData } from '../model';
import { DirectorateGrid } from './components/DirectorateGrid';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useTranslations } from 'next-intl';

export const DirectoratePage: React.FC = () => {
    const t = useTranslations("Directorate");
    return (
        <>
            <PageHeader
               title={t('DirectorateTitle')}
               description={t('DirectorateDescription')}
            />
            <DirectorateGrid members={directorateData} />
        </>
    );
};