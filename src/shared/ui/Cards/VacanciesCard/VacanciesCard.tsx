import { VacanciesList } from '@/widgets/Vacancies/ui/components/VacanciesList';
import styles from './VacanciesCard.module.scss';

interface DocumentItem {
    icon: string;
    title: string;
    description: string;
}

interface VacanciesCardProps {
    title: string;
    documents: DocumentItem[];
    icon: React.ReactNode;
    isDriversCard?: boolean;
}

export const VacanciesCard: React.FC<VacanciesCardProps> = ({ 
    title, 
    documents, 
    icon,
    isDriversCard = false 
}) => {
    return (
        <div className={`${styles.card} ${isDriversCard ? styles.driversCard : ''}`}>
            <h2 className={styles.cardTitle}>
                {icon}
                {title}
            </h2>
            <VacanciesList documents={documents} />
        </div>
    );
};