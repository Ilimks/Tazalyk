'use client'
import styles from './DirectorateHeader.module.scss';

export const DirectorateHeader: React.FC = () => {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>Генеральная дирекция</h1>
            <p className={styles.description}>
                Руководство муниципального предприятия "Тазалык"
            </p>
        </div>
    );
};