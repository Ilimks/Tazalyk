import { DocumentCard } from '@/shared/ui/Cards';
import { DocumentCard as DocumentCardType } from '@/entities/procurement/model/types';
import styles from './ProcurementDocumentsGrid.module.scss';

interface ProcurementDocumentsGridProps {
    documents: DocumentCardType[];
    onView: (doc: DocumentCardType) => void;
    onDownload: (pdfUrl: string, fileName: string) => void;
}

export const ProcurementDocumentsGrid: React.FC<ProcurementDocumentsGridProps> = ({
    documents,
    onView,
    onDownload
}) => {

    
    return (
        <div className={styles.documentsGrid}>
            {documents.map((doc) => (
                <DocumentCard
                    key={doc.id}
                    title={doc.title}
                    description={doc.description}
                    iconType={doc.icon}
                    onView={() => onView(doc)}
                    onDownload={() => onDownload(doc.pdfUrl, doc.fileName)}
                />
            ))}
        </div>
    );
};