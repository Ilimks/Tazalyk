import { PageHeader } from '@/shared/ui/PageHeader';
import { useTranslations } from 'next-intl';
import { ContactsMapSection } from './components/ContactsMapSection';
import { ContactsInfoSection } from './components/ContactsInfoSection';

export const ContactsPage: React.FC = () => {
    const t = useTranslations("Contacts");

    return (
        <>
            <PageHeader
                title={t('ContactsTitle')} 
                description={t('ContactsDescription')} 
            />
            <ContactsInfoSection/>
            <ContactsMapSection/>
        </>
    )
}