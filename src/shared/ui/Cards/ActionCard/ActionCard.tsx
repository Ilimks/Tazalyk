'use client';
import { Link } from '@/i18n/navigation';
import styles from './ActionCard.module.scss';

interface ActionCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    href: string;
}

export const ActionCard: React.FC<ActionCardProps> = ({
    title,
    description,
    icon,
    href
}) => {
    return (
        <Link href={href} className={styles.card}>
            <div className={styles.cardContent}>
                {icon && (
                    <div className={styles.iconWrapper}>
                        {icon}
                    </div>
                )}
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <div className={styles.arrow}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </Link>
    );
};