import type { LucideIcon } from 'lucide-react';
import styles from './VacanciesList.module.scss';

export interface DocumentItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface VacanciesListProps {
    documents: DocumentItem[];
}

export const VacanciesList: React.FC<VacanciesListProps> = ({ documents }) => {
    return (
        <ul className={styles.list}>
            {documents.map(({ icon: Icon, title, description }, index) => (
                <li key={index}>
                    <span className={styles.listIcon}>
                        <Icon size={22} aria-hidden />
                    </span>
                    <div>
                        <strong>{title}</strong>
                        <span>{description}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
};