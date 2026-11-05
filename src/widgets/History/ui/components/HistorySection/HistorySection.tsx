'use client'
import Image from 'next/image';
import { StatsCard } from '@/shared/ui/Cards';
import styles from './HistorySection.module.scss';

// Две колонки в .container (max 1280px, gap 60px) → ~610px; до 768px — одна колонка на 90% ширины.
const IMAGE_SIZES = '(max-width: 768px) 90vw, (max-width: 1350px) 48vw, 610px';

interface HistorySectionProps {
    variant: 'left' | 'right';
    title: string;
    imageSrc: string;
    imageWidth: number;
    imageHeight: number;
    imageAlt: string;
    imageCaption?: string;
    imagePriority?: boolean;
    showStats?: boolean;
    paragraphs: string[];
}

export const HistorySection: React.FC<HistorySectionProps> = ({
    variant,
    title,
    imageSrc,
    imageWidth,
    imageHeight,
    imageAlt,
    imageCaption,
    imagePriority,
    showStats,
    paragraphs
}) => (
    <section>
        <div className="container">
            <div className={`${styles.section} ${variant === 'left' ? styles.sectionLeft : styles.sectionRight}`}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={imageWidth}
                        height={imageHeight}
                        sizes={IMAGE_SIZES}
                        priority={imagePriority}
                        fetchPriority={imagePriority ? 'high' : undefined}
                        className={styles.image}
                    />
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