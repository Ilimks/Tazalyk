'use client';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useTranslations } from 'next-intl';
import { ComplaintForm } from './components/ComplaintForm';

export const ComplaintsPage: React.FC = () => {
    const t = useTranslations("Complaints");

    return (
        <>
            <PageHeader
                title={t('title')}
                description={t('description')}
            />
            
            <ComplaintForm />
        </>
    );
};