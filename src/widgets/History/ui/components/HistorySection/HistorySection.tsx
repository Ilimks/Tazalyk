'use client'
import { StatsCard } from '@/shared/ui/Cards';
import styles from './HistorySection.module.scss';

interface HistorySectionProps {
    variant: 'left' | 'right';
    title: string;
    imageSrc: string;
    imageAlt: string;
    imageCaption?: string;
    showStats?: boolean;
    paragraphs: string[];
}

export const HistorySection: React.FC<HistorySectionProps> = ({
    variant,
    title,
    imageSrc,
    imageAlt,
    imageCaption,
    showStats,
    paragraphs
}) => (
    <section>
        <div className="container">
            <div className={`${styles.section} ${variant === 'left' ? styles.sectionLeft : styles.sectionRight}`}>
                <div className={styles.imageWrapper}>
                    <img src={imageSrc} alt={imageAlt} className={styles.image} />
                    {imageCaption && <div className={styles.imageCaption}>{imageCaption}</div>}
                </div>
                <div className={styles.content}>
                    <h2>{title}</h2>
                    {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                    {showStats && <StatsCard />}
                </div>
            </div>
        </div>
    </section>
);