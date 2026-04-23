import { ButtonTable } from '../../Buttons';
import { DocumentIcons } from '../../DocumentIcons';
import styles from './DocumentCard.module.scss';

interface DocumentCardProps {
    title: string;
    description: string;
    iconType: string;
    onView: () => void;
    onDownload: () => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
    title,
    description,
    iconType,
    onView,
    onDownload
}) => {
    const IconComponent = DocumentIcons[iconType as keyof typeof DocumentIcons] || DocumentIcons.document;

    return (
        <div className={styles.documentCard}>
            <div className={styles.cardIcon}>
                {IconComponent}
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDescription}>{description}</p>
            <div className={styles.cardActions}>
                <ButtonTable
                    variant="secondary"
                    size="sm"
                    icon={DocumentIcons.viewIcon}
                    onClick={onView}
                >
                    Просмотр
                </ButtonTable>
                <ButtonTable
                    variant="success"
                    size="sm"
                    icon={DocumentIcons.downloadIcon}
                    onClick={onDownload}
                >
                    Скачать
                </ButtonTable>
            </div>
        </div>
    );
};