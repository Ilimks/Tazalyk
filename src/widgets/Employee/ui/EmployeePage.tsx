'use client';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useTranslations } from 'next-intl';
import { EmployeeSchedule } from './components/EmployeeSchedule';

export const EmployeePage: React.FC = () => {
    const t = useTranslations("Employee");

    return (
        <>
            <PageHeader
                title={t('title')}
                description={t('description')}
                image="/assets/images/History3.webp"
                imagePosition="50% 46%"
            />
            
            <EmployeeSchedule/>
        </>
    );
};