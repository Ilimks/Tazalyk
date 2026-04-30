'use client';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useTranslations } from 'next-intl';
import { AttendanceTable } from './components/AttendanceTable';

export const AttendancePage: React.FC = () => {
    const t = useTranslations("Attendance");

    return (
        <>
            <PageHeader
                title={t('title')}
                description={t('description')}
            />
            
            <AttendanceTable />
        </>
    );
};