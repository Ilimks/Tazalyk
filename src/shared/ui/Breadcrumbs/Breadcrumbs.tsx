import { Link } from '@/i18n/navigation';
import styles from './Breadcrumbs.module.scss';

export type BreadcrumbItem = {
    label: string;
    // путь без префикса языка, например "/news"
    href: string;
    isActive: boolean;
};

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    if (items.length <= 1) return null;

    return (
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <ol className={styles.breadcrumbs__list}>
                {items.map((item, index) => (
                    <li key={item.href} className={styles.breadcrumbs__item}>
                        {index > 0 && (
                            <span className={styles.breadcrumbs__separator}>/</span>
                        )}
                        {item.isActive ? (
                            <span className={styles.breadcrumbs__current} aria-current="page">
                                {item.label}
                            </span>
                        ) : (
                            <Link href={item.href} className={styles.breadcrumbs__link}>
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};
