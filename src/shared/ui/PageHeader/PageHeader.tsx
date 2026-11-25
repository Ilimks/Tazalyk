import Image from 'next/image';
import styles from './PageHeader.module.scss';

interface PageHeaderProps {
    title: string;
    description?: string;
    /** своя фотография справа в полосе заголовка; на телефоне её нет */
    image?: string;
    /** что держать в кадре, как object-position */
    imagePosition?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, image, imagePosition }) => {
    return (
        <section className={`${styles.pageHeader} ${image ? styles.withCover : ''}`}>
            {image && (
                <div className={styles.cover} aria-hidden>
                    <Image src={image} alt="" fill sizes="(max-width: 1000px) 1px, 52vw" style={{ objectPosition: imagePosition }} />
                </div>
            )}
            <div className="container">
                <div className={styles.pageTitleWrapper}>
                    <h1 className={styles.pageTitle}>{title}</h1>
                </div>
                {description && <p className={styles.pageDescription}>{description}</p>}
            </div>
        </section>
    );
};
