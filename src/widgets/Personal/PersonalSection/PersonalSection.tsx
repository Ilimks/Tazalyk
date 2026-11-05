'use client';
import { useTranslations } from 'next-intl';
import { ClipboardList, MessageSquareWarning, Receipt } from 'lucide-react';
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
            icon: <Receipt aria-hidden />
        },
        {
            id: 2,
            title: t('services.title'),
            description: t('services.description'),
            href: '/attendance',
            icon: <ClipboardList aria-hidden />
        },
        {
            id: 3,
            title: t('complaint.title'),
            description: t('complaint.description'),
            href: '/complaints',
            icon: <MessageSquareWarning aria-hidden />
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