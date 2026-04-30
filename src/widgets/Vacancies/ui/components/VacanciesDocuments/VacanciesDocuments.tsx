import { VacanciesCard } from '@/shared/ui/Cards/VacanciesCard';
import styles from './VacanciesDocuments.module.scss';
import { useTranslations } from 'next-intl';

export const VacanciesDocuments: React.FC = () => {
    const t = useTranslations("Vacancies");

    const generalDocuments = [
        { icon: '📄', title: t('VacanciesAllId'), description: t('VacanciesAllIdText') },
        { icon: '📘', title: t('VacanciesAllBook'), description: t('VacanciesAllBookText') },
        { icon: '🖼️', title: t('VacanciesAllPhoto'), description: t('VacanciesAllPhotoText') },
        { icon: '🏥', title: t('VacanciesAllMed'), description: t('VacanciesAllMedText') },
        { icon: '🎖️', title: t('VacanciesAllWar'), description: t('VacanciesAllWarText') },
    ];

    const driverDocuments = [
        { icon: '🚗', title: t('VacanciesDriverCertificate'), description: t('VacanciesDriverCertificateText') },
        { icon: '🔍', title: t('VacanciesDriverCriminal'), description: t('VacanciesDriverCriminalText') },
        { icon: '🏥', title: t('VacanciesDriverMed'), description: t('VacanciesDriverMedText') },
    ];

    return (
        <section>
            <div className="container">
                <div className={styles.vacanciesDocuments}>
                    <div className={styles.content}>
                        <VacanciesCard 
                            title={t('VacanciesAll')}
                            documents={generalDocuments}
                            icon={
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            }
                        />
                        
                        <VacanciesCard 
                            title={t('VacanciesDriver')}
                            documents={driverDocuments}
                            isDriversCard
                            icon={
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 9h14M7 5h10M3 13h18M5 17h14M7 21h10" stroke="currentColor" strokeWidth="2"/>
                                    <circle cx="7" cy="13" r="2" stroke="currentColor" strokeWidth="2"/>
                                    <circle cx="17" cy="13" r="2" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                            }
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};