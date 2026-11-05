import { ListChecks } from 'lucide-react';
import styles from './InfoCard.module.scss';

interface InfoCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, description, icon }) => {
    return (
        <section className={styles.sectionInfoCard}>
            <div className="container">
                <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                        {icon || <ListChecks size={24} aria-hidden />}
                    </div>
                    <div className={styles.infoContent}>
                        <h4 className={styles.infoTitle}>{title}</h4>
                        <p className={styles.infoText}>{description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};