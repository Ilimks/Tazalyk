'use client'
import styles from './ConclusionSection.module.scss';

interface ConclusionSectionProps {
    title: string;
    paragraphs: string[];
}

export const ConclusionSection: React.FC<ConclusionSectionProps> = ({ title, paragraphs }) => (
    <div className={styles.conclusion}>
        <h2>{title}</h2>
        {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
    </div>
);