import { PageHeader } from '@/shared/ui/PageHeader';
import { useTranslations } from 'next-intl';
import { StructureOrganization } from './components/StructureOrganization';
import { StructureActivity } from './components/StructureActivity';



export const StructurePage: React.FC = () => {
    const t = useTranslations("Structure");

    return (
        <>
            <PageHeader
                title={t('title')}
                description={t('description')}
                image="/assets/images/History1.webp"
                imagePosition="50% 40%"
            />
            
            <StructureOrganization />

            <StructureActivity />
        </>
    );
};