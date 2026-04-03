'use client'
import styles from './InfoBox.module.scss';

interface InfoBoxProps {
    title: string;
    items: string[];
}

export const InfoBox: React.FC<InfoBoxProps> = ({ title, items }) => (
    <div className={styles.infoBox}>
        <div className={styles.infoBoxIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
        </div>
        <div className={styles.infoBoxContent}>
            <h4>{title}</h4>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    </div>
);