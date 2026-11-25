import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { HomeSectionHeader } from '@/shared/ui/HomeSectionHeader';
import styles from './WorkSection.module.scss';

/** Все направления работы предприятия, с надписью на фото. Откуда снимки — docs/photo-sources.md */
export const WorkSection: React.FC = () => {
    const t = useTranslations('Work');
    const tActivity = useTranslations('Structure.activity');

    const tiles = [
        { key: 'waste', title: tActivity('wasteRemoval'), text: tActivity('wasteRemovalDesc'), position: '50% 60%' },
        { key: 'streets', title: tActivity('sanitaryCleaning'), text: tActivity('sanitaryCleaningDesc'), position: '50% 55%' },
        { key: 'roads', title: tActivity('landscaping'), text: tActivity('landscapingDesc'), position: '50% 62%' },
        { key: 'animals', title: tActivity('strayAnimals'), text: tActivity('strayAnimalsDesc'), position: '50% 34%' },
        { key: 'demolition', title: tActivity('demolition'), text: tActivity('demolitionDesc'), position: '62% 40%' },
        { key: 'fountains', title: tActivity('fountains'), text: tActivity('fountainsDesc'), position: '50% 60%' },
    ];

    return (
        <section className={styles.work} aria-labelledby="work-title">
            <div className="container">
                <div className={styles.box}>
                    <HomeSectionHeader
                        title={t('title')}
                        buttonText={t('button')}
                        buttonLink="/structure"
                        titleId="work-title"
                    />
                    <ul className={styles.grid}>
                        {tiles.map(({ key, title, text, position }, index) => (
                            <li key={key} data-reveal suppressHydrationWarning className={`${styles.tile} ${index === 0 ? styles.lead : ''}`}>
                                <Image
                                    src={`/assets/images/work/${key}.webp`}
                                    alt=""
                                    fill
                                    sizes={index === 0 ? '(max-width: 640px) 92vw, (max-width: 1360px) 64vw, 850px' : '(max-width: 640px) 92vw, (max-width: 1360px) 32vw, 415px'}
                                    style={{ objectPosition: position }}
                                />
                                <div className={styles.text}>
                                    <h3>{title}</h3>
                                    <p>{text}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
