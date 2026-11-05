import {
    BookOpen,
    Car,
    FileText,
    IdCard,
    Image as ImageIcon,
    Medal,
    ShieldCheck,
    Stethoscope,
    Truck,
} from 'lucide-react';
import { VacanciesCard } from '../VacanciesCard';
import styles from './VacanciesDocuments.module.scss';
import { useTranslations } from 'next-intl';

export const VacanciesDocuments: React.FC = () => {
    const t = useTranslations("Vacancies");

    const generalDocuments = [
        { icon: IdCard, title: t('VacanciesAllId'), description: t('VacanciesAllIdText') },
        { icon: BookOpen, title: t('VacanciesAllBook'), description: t('VacanciesAllBookText') },
        { icon: ImageIcon, title: t('VacanciesAllPhoto'), description: t('VacanciesAllPhotoText') },
        { icon: Stethoscope, title: t('VacanciesAllMed'), description: t('VacanciesAllMedText') },
        { icon: Medal, title: t('VacanciesAllWar'), description: t('VacanciesAllWarText') },
    ];

    const driverDocuments = [
        { icon: Car, title: t('VacanciesDriverCertificate'), description: t('VacanciesDriverCertificateText') },
        { icon: ShieldCheck, title: t('VacanciesDriverCriminal'), description: t('VacanciesDriverCriminalText') },
        { icon: Stethoscope, title: t('VacanciesDriverMed'), description: t('VacanciesDriverMedText') },
    ];

    return (
        <section>
            <div className="container">
                <div className={styles.vacanciesDocuments}>
                    <div className={styles.content}>
                        <VacanciesCard 
                            title={t('VacanciesAll')}
                            documents={generalDocuments}
                            icon={<FileText size={28} aria-hidden />}
                        />
                        
                        <VacanciesCard 
                            title={t('VacanciesDriver')}
                            documents={driverDocuments}
                            isDriversCard
                            icon={<Truck size={28} aria-hidden />}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};