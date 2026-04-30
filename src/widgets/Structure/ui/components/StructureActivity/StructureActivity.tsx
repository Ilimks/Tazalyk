'use client';
import { useTranslations } from 'next-intl';
import styles from './StructureActivity.module.scss';

export const StructureActivity: React.FC = () => {
    const t = useTranslations("Structure");

    const activities = [
        {
            icon: "🗑️",
            title: t('activity.sanitaryCleaning'),
            description: t('activity.sanitaryCleaningDesc')
        },
        {
            icon: "🚛",
            title: t('activity.wasteRemoval'),
            description: t('activity.wasteRemovalDesc')
        },
        {
            icon: "🏞️",
            title: t('activity.landscaping'),
            description: t('activity.landscapingDesc')
        },
        {
            icon: "🐕",
            title: t('activity.strayAnimals'),
            description: t('activity.strayAnimalsDesc')
        },
        {
            icon: "🏗️",
            title: t('activity.demolition'),
            description: t('activity.demolitionDesc')
        },
        {
            icon: "💧",
            title: t('activity.fountains'),
            description: t('activity.fountainsDesc')
        }
    ];

    return (
        <section className={styles.structureActivity}>
            <div className="container">
                <h2 className={styles.sectionTitle}>{t('activity.title')}</h2>
                <div className={styles.grid}>
                    {activities.map((item, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.icon}>{item.icon}</div>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <p className={styles.cardDesc}>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};