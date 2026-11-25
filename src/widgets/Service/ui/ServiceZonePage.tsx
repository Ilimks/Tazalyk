'use client'
import { ServiceZoneMap } from './components/ServiceZoneMap';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useTranslations } from 'next-intl';

export const ServiceZonePage: React.FC = () => {
    const t = useTranslations("Service");

    return (
        <>
            <PageHeader
                title={t('ServiceTitle')}
                description={t('ServiceDescription')}
                image="/assets/images/covers/zone.webp"
                imagePosition="50% 46%"
            />
            <ServiceZoneMap />
        </>
    )
}