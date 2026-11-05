import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { sideAds, AdBanner } from '../../model/ads';
import { AdLink } from '../AdLink/AdLink';
import styles from './SideAds.module.scss';

interface SideAdsProps {
    children: ReactNode;
}

// Оборачивает контент страницы и ставит баннеры в свободные поля слева и справа.
// Баннеры «прилипают» при прокрутке и не заезжают на футер.
export const SideAds: React.FC<SideAdsProps> = ({ children }) => {
    const t = useTranslations('Ads');

    const renderRail = (ad: AdBanner | null, side: 'left' | 'right') => {
        if (!ad) return null;

        return (
            <aside className={`${styles.rail} ${styles[side]}`} aria-label={t('label')}>
                <div className={styles.sticky}>
                    <span className={styles.label}>{t('label')}</span>
                    <AdLink href={ad.href} className={styles.banner}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={ad.image} alt={ad.alt ?? t('placeholder')} width={160} height={600} decoding="async" />
                    </AdLink>
                </div>
            </aside>
        );
    };

    return (
        <div className={styles.wrapper}>
            {children}
            {renderRail(sideAds.left, 'left')}
            {renderRail(sideAds.right, 'right')}
        </div>
    );
};
