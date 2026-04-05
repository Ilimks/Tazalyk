'use client';
import styles from './Language.module.scss';

export const Language = () => {

  return (
    <div className={styles.lang}>
        <button className={styles.langItem}>Кыр</button>
        <span className={styles.divider} />
        <button className={`${styles.langItem} ${styles.active}`}>Рус</button>
    </div>

  );
};


