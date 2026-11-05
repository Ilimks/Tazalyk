import { useTranslations } from 'next-intl';
import { inlineAd, sideAds } from '../../model/ads';
import { AdLink } from '../AdLink/AdLink';
import styles from './InlineAd.module.scss';

// Горизонтальный баннер для экранов, где по бокам нет места
export const InlineAd: React.FC = () => {
    const t = useTranslations('Ads');

    if (!inlineAd) return null;

    const hasSideAds = Boolean(sideAds.left || sideAds.right);

    return (
        <aside
            className={`${styles.inlineAd} ${hasSideAds ? styles.hideOnWide : ''}`}
            aria-label={t('label')}
        >
            <div className="container">
                <span className={styles.label}>{t('label')}</span>
                <AdLink href={inlineAd.href} className={styles.banner}>
                    <picture>
                        {inlineAd.mobileImage && (
                            <source
                                media="(max-width: 767px)"
                                srcSet={inlineAd.mobileImage}
                                width={320}
                                height={100}
                            />
                        )}
                        <img
                            src={inlineAd.image}
                            alt={inlineAd.alt ?? t('placeholder')}
                            width={728}
                            height={90}
                            loading="lazy"
                            decoding="async"
                        />
                    </picture>
                </AdLink>
            </div>
        </aside>
    );
};
