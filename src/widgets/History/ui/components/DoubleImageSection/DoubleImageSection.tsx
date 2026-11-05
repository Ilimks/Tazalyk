'use client'
import Image from 'next/image';
import styles from './DoubleImageSection.module.scss';

// Две колонки в .container (max 1280px, gap 30px) → ~625px; до 768px — одна колонка на 90% ширины.
const IMAGE_SIZES = '(max-width: 768px) 90vw, (max-width: 1350px) 48vw, 625px';

interface DoubleImageSectionProps {
    title: string;
    image1Src: string;
    image1Width: number;
    image1Height: number;
    image1Alt: string;
    image2Src: string;
    image2Width: number;
    image2Height: number;
    image2Alt: string;
    paragraphs: string[];
}

export const DoubleImageSection: React.FC<DoubleImageSectionProps> = ({
    title,
    image1Src,
    image1Width,
    image1Height,
    image1Alt,
    image2Src,
    image2Width,
    image2Height,
    image2Alt,
    paragraphs
}) => (
    <section>
        <div className="container">
            <div className={styles.sectionDouble}>
                <div className={styles.content}>
                    <h2>{title}</h2>
                    {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                <div className={styles.imagesGrid}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={image1Src}
                            alt={image1Alt}
                            width={image1Width}
                            height={image1Height}
                            sizes={IMAGE_SIZES}
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={image2Src}
                            alt={image2Alt}
                            width={image2Width}
                            height={image2Height}
                            sizes={IMAGE_SIZES}
                            className={styles.image}
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
);