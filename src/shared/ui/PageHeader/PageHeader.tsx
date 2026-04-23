import styles from './PageHeader.module.scss';

interface PageHeaderProps {
    title: string;
    description?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
    return (
        <section className={styles.pageHeader}>
            <div className="container">
                <div className={styles.pageTitleWrapper}>
                    <h1 className={styles.pageTitle}>{title}</h1>
                </div>
                {description && <p className={styles.pageDescription}>{description}</p>}
            </div>
        </section>
    );
};