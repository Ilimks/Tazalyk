'use client';
import { useTranslations } from 'next-intl';
import { CityMap } from '@/shared/ui/CityMap';

export const ContactsMap: React.FC = () => {
    const t = useTranslations('Contacts');

    return <CityMap mode="bases" title={t('ContactsMapTitle')} />;
};
