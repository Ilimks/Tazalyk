'use client';
import { ArrowRight } from 'lucide-react';
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
                    <ArrowRight size={24} aria-hidden />
                </div>
            </div>
        </Link>
    );
};