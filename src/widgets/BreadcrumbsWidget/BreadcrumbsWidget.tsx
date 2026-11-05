'use client'
import { useLocale } from 'next-intl';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { JsonLd } from '@/shared/ui/JsonLd';
import { SITE_URL } from '@/shared/config/site';
import { useBreadcrumbs } from '@/features/breadcrumbs';
import styles from './BreadcrumbsWidget.module.scss';

interface BreadcrumbsWidgetProps {
    // подпись текущей страницы, если её нельзя взять из адреса (например, заголовок новости)
    currentLabel?: string;
}

export const BreadcrumbsWidget: React.FC<BreadcrumbsWidgetProps> = ({ currentLabel }) => {
    const locale = useLocale();
    const items = useBreadcrumbs(currentLabel);

    if (items.length <= 1) return null;

    // разметка для поисковиков: в выдаче показывается путь «Главная › Новости › …»
    const breadcrumbList = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            // в разметке — полный заголовок, а не сокращённый для экрана
            name: index === items.length - 1 && currentLabel ? currentLabel : item.label,
            item: `${SITE_URL}/${locale}${item.href === '/' ? '' : item.href}`,
        })),
    };

    return (
        <section className={styles.widget}>
            <JsonLd data={breadcrumbList} />
            <div className="container">
                <Breadcrumbs items={items} />
            </div>
        </section>
    );
};
