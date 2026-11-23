'use client'
import Image from 'next/image';
import { Award } from 'lucide-react';
import type { HistoryImage } from '../HistorySection/HistorySection';
import styles from './AwardsSection.module.scss';

interface AwardsSectionProps {
    title: string;
    image: HistoryImage;
    paragraphs: string[];
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({ title, image, paragraphs }) => (
    <section data-reveal suppressHydrationWarning className={styles.awards}>
        <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 900px) 92vw, 560px"
            className={styles.image}
        />
        <div className={styles.content}>
            <span className={styles.icon}>
                <Award size={26} aria-hidden />
            </span>
            <h2>{title}</h2>
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
    </section>
);
