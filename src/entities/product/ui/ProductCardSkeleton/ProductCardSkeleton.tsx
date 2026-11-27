import styles from './ProductCardSkeleton.module.scss';

export const ProductCardSkeleton: React.FC = () => (
    <div className={styles.card} aria-hidden="true">
        <div className={`${styles.media} ${styles.shimmer}`} />
        <div className={styles.body}>
            <div className={`${styles.line} ${styles.lineShort} ${styles.shimmer}`} />
            <div className={`${styles.line} ${styles.shimmer}`} />
            <div className={`${styles.line} ${styles.lineMedium} ${styles.shimmer}`} />
            <div className={`${styles.button} ${styles.shimmer}`} />
        </div>
    </div>
);
