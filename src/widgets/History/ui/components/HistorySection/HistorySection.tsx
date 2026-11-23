'use client'
import Image from 'next/image';
import { StatsCard } from '@/shared/ui/Cards';
import styles from './HistorySection.module.scss';

// колонка с фото ~ 480px, на телефоне — во всю ширину
const IMAGE_SIZES = '(max-width: 900px) 92vw, 480px';

export interface HistoryImage {
    src: string;
    width: number;
    height: number;
    alt: string;
    caption?: string;
}

interface HistorySectionProps {
    title: string;
    images: HistoryImage[];
    imagePriority?: boolean;
    showStats?: boolean;
    paragraphs: string[];
}

// «2008-2010: Начало пути» → годы отдельно, название отдельно
const splitTitle = (title: string) => {
    const match = title.match(/^(\d{4})\s*[-–]\s*(\d{4}):\s*(.+)$/);
    return match ? { years: `${match[1]}–${match[2]}`, name: match[3] } : { years: '', name: title };
};

export const HistorySection: React.FC<HistorySectionProps> = ({
    title,
    images,
    imagePriority,
    showStats,
    paragraphs
}) => {
    const { years, name } = splitTitle(title);

    return (
        <li data-reveal suppressHydrationWarning className={styles.section}>
            <p className={styles.years}>{years}</p>
            <div className={styles.content}>
                <h2>{name}</h2>
                {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                {showStats && <StatsCard />}
            </div>
            <div className={styles.images}>
                {images.map((image) => (
                    <figure key={image.src} className={styles.figure}>
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            sizes={IMAGE_SIZES}
                            priority={imagePriority}
                            fetchPriority={imagePriority ? 'high' : undefined}
                            className={styles.image}
                        />
                        {image.caption && <figcaption>{image.caption}</figcaption>}
                    </figure>
                ))}
            </div>
        </li>
    );
};
