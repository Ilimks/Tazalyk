import styles from './VacanciesList.module.scss';

interface DocumentItem {
    icon: string;
    title: string;
    description: string;
}

interface VacanciesListProps {
    documents: DocumentItem[];
}

export const VacanciesList: React.FC<VacanciesListProps> = ({ documents }) => {
    return (
        <ul className={styles.list}>
            {documents.map((doc, index) => (
                <li key={index}>
                    <span className={styles.listIcon}>{doc.icon}</span>
                    <div>
                        <strong>{doc.title}</strong>
                        <span>{doc.description}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
};