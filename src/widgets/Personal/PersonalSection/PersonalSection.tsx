'use client';
import { useTranslations } from 'next-intl';
import { ActionCard } from '@/shared/ui/Cards';
import styles from './PersonalSection.module.scss';

export const PersonalSection: React.FC = () => {
    const t = useTranslations('PersonalCabinet');
    
    const actions = [
        {
            id: 1,
            title: t('tariffs.title'),
            description: t('tariffs.description'),
            href: '/tariffs',
            icon: (
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
            )
        },
        {
            id: 2,
            title: t('services.title'),
            description: t('services.description'),
            href: '/attendance',
            icon: (
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 5a1 1 0 0 1-1-1V3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 13h8M8 17h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            id: 3,
            title: t('complaint.title'),
            description: t('complaint.description'),
            href: '/complaints',
            icon: (
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 8v4M12 16h.01M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            )
        }
    ];
    
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.grid}>
                    {actions.map((action) => (
                        <ActionCard
                            key={action.id}
                            title={action.title}
                            description={action.description}
                            icon={action.icon}
                            href={action.href}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};