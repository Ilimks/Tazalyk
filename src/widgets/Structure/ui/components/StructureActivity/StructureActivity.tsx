'use client';
import { useTranslations } from 'next-intl';
import { Dog, Droplets, Hammer, Trash, Trees, Truck } from 'lucide-react';
import styles from './StructureActivity.module.scss';

export const StructureActivity: React.FC = () => {
    const t = useTranslations("Structure");

    const activities = [
        {
            icon: Trash,
            title: t('activity.sanitaryCleaning'),
            description: t('activity.sanitaryCleaningDesc')
        },
        {
            icon: Truck,
            title: t('activity.wasteRemoval'),
            description: t('activity.wasteRemovalDesc')
        },
        {
            icon: Trees,
            title: t('activity.landscaping'),
            description: t('activity.landscapingDesc')
        },
        {
            icon: Dog,
            title: t('activity.strayAnimals'),
            description: t('activity.strayAnimalsDesc')
        },
        {
            icon: Hammer,
            title: t('activity.demolition'),
            description: t('activity.demolitionDesc')
        },
        {
            icon: Droplets,
            title: t('activity.fountains'),
            description: t('activity.fountainsDesc')
        }
    ];

    return (
        <section className={styles.structureActivity}>
            <div className="container">
                <h2 className={styles.sectionTitle}>{t('activity.title')}</h2>
                <div className={styles.grid}>
                    {activities.map(({ icon: Icon, title, description }, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.icon}>
                                <Icon size={36} aria-hidden />
                            </div>
                            <h3 className={styles.cardTitle}>{title}</h3>
                            <p className={styles.cardDesc}>{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};