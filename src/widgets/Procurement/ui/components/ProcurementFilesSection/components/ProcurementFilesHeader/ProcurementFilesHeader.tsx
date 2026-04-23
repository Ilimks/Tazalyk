import styles from './ProcurementFilesHeader.module.scss';

interface ProcurementFilesHeaderProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
}

export const ProcurementFilesHeader: React.FC<ProcurementFilesHeaderProps> = ({ 
    title, 
    subtitle, 
    centered = true 
}) => {
    return (
        <div className={`${styles.sectionHeader} ${centered ? styles.centered : ''}`}>
            <h3 className={styles.title}>{title}</h3>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
    );
};