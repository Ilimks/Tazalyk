import { useTranslations } from 'next-intl';
import { Download, Eye } from 'lucide-react';
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
    const t = useTranslations("Documents");
    const Icon = DocumentIcons[iconType] ?? DocumentIcons.document;

    return (
        <div className={styles.documentCard}>
            <div className={styles.cardIcon}>
                <Icon size={40} aria-hidden />
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDescription}>{description}</p>
            <div className={styles.cardActions}>
                <ButtonTable
                    variant="secondary"
                    size="sm"
                    icon={<Eye size={18} aria-hidden />}
                    onClick={onView}
                >
                    {t("view")}
                </ButtonTable>
                <ButtonTable
                    variant="success"
                    size="sm"
                    icon={<Download size={18} aria-hidden />}
                    onClick={onDownload}
                >
                    {t("download")}
                </ButtonTable>
            </div>
        </div>
    );
};