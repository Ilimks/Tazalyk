'use client'
import { Info } from 'lucide-react';
import styles from './InfoBox.module.scss';

interface InfoBoxProps {
    title: string;
    items: string[];
}

export const InfoBox: React.FC<InfoBoxProps> = ({ title, items }) => {
    
    return (
        <section className={styles.info}>
            <div className="container">
                <div className={styles.infoBox}>
                    <div className={styles.infoBoxIcon}>
                        <Info aria-hidden />
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
            </div>
        </section>
    )
}