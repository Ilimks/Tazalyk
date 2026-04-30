'use client';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useTranslations } from 'next-intl';
import { VacanciesNote } from './components/VacanciesNote';
import { VacanciesContacts } from './components/VacanciesContacts';
import { VacanciesDocuments } from './components/VacanciesDocuments';

export const VacanciesPage: React.FC = () => {
    const t = useTranslations("Vacancies");

    return (
        <>
            <PageHeader
                title={t('VacanciesTitle')}
                description={t('VacanciesDescription')}
            />
            
            <VacanciesDocuments />
            
            <VacanciesNote />
            
            <VacanciesContacts />
        </>
    );
};