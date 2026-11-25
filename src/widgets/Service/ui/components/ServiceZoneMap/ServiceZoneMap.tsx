'use client';

import { useTranslations } from 'next-intl';
import { CityMap } from '@/shared/ui/CityMap';
import styles from './ServiceZoneMap.module.scss';

export const ServiceZoneMap: React.FC = () => {
    const t = useTranslations('Service');

    return (
        <section className={styles.map}>
            <div className="container">
                <CityMap mode="zone" title={t('ServiceMapTitle')} />
            </div>
        </section>
    );
};
