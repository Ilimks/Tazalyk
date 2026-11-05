'use client';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useTranslations } from 'next-intl';
import { VacanciesNote } from './components/VacanciesNote';
import { VacanciesContacts } from './components/VacanciesContacts';
import { VacanciesDocuments } from './components/VacanciesDocuments';
import { VacanciesOpenings } from './components/VacanciesOpenings';
import type { Vacancy } from '@/entities/vacancy';

interface VacanciesPageProps {
    // открытые вакансии с сервера; null — догрузятся в браузере
    initialVacancies: Vacancy[] | null;
}

export const VacanciesPage: React.FC<VacanciesPageProps> = ({ initialVacancies }) => {
    const t = useTranslations("Vacancies");

    return (
        <>
            <PageHeader
                title={t('VacanciesTitle')}
                description={t('VacanciesDescription')}
            />

            <VacanciesOpenings initialVacancies={initialVacancies} />
            
            <VacanciesDocuments />
            
            <VacanciesNote />
            
            <VacanciesContacts />
        </>
    );
};