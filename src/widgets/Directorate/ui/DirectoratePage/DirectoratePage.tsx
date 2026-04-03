'use client'
import { DirectorateHeader, directorateData } from '@/entities/directorate';
import { DirectorateGrid } from '@/features/directorate';
import styles from './DirectoratePage.module.scss';

export const DirectoratePage: React.FC = () => {
    return (
        <section className={styles.directorate}>
            <div className="container">
                <DirectorateHeader />
                <DirectorateGrid members={directorateData} />
            </div>
        </section>
    );
};