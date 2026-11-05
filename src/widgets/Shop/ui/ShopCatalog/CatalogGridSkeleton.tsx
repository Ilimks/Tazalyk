import { ProductCardSkeleton } from '@/entities/product';
import styles from './ShopCatalog.module.scss';

interface CatalogGridSkeletonProps {
    count?: number;
}

export const CatalogGridSkeleton: React.FC<CatalogGridSkeletonProps> = ({ count = 8 }) => (
    <ul className={styles.grid} aria-hidden="true">
        {Array.from({ length: count }, (_, index) => (
            <li key={index} className={styles.gridItem}>
                <ProductCardSkeleton />
            </li>
        ))}
    </ul>
);
