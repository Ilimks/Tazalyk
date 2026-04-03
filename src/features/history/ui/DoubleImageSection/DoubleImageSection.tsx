'use client'
import styles from './DoubleImageSection.module.scss';

interface DoubleImageSectionProps {
    title: string;
    image1Src: string;
    image1Alt: string;
    image2Src: string;
    image2Alt: string;
    paragraphs: string[];
}

export const DoubleImageSection: React.FC<DoubleImageSectionProps> = ({
    title,
    image1Src,
    image1Alt,
    image2Src,
    image2Alt,
    paragraphs
}) => (
    <div className={styles.sectionDouble}>
        <div className={styles.content}>
            <h2>{title}</h2>
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className={styles.imagesGrid}>
            <div className={styles.imageWrapper}>
                <img src={image1Src} alt={image1Alt} className={styles.image} />
            </div>
            <div className={styles.imageWrapper}>
                <img src={image2Src} alt={image2Alt} className={styles.image} />
            </div>
        </div>
    </div>
);