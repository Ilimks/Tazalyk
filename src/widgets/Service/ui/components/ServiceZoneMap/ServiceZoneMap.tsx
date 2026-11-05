'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loading } from '@/shared/ui/Loading';
import styles from './ServiceZoneMap.module.scss';

export const ServiceZoneMap: React.FC = () => {
    const t = useTranslations('Service');
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMapLoaded(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className={styles.map}>
            <div className="container">
                <div className={styles.mapContainer}>
                    {!mapLoaded && (
                        <div className={styles.mapLoader}>
                            <Loading />
                            <p>{t('ServiceMapLoading')}</p>
                        </div>
                    )}
                    <div 
                        className={styles.mapWrapper}
                        style={{ display: mapLoaded ? 'block' : 'none' }}
                    >
                        <iframe 
                            ref={iframeRef}
                            src="https://yandex.ru/map-widget/v1/?um=constructor%3A7289a85b05a45144e85f18eaca131b57ed80d332c9bc8e8f692d899c36bb4271&amp;source=constructor" 
                            width="100%" 
                            height="667" 
                            frameBorder="0"
                            title={t('ServiceMapTitle')}
                            className={styles.iframe}
                            onLoad={() => setMapLoaded(true)}
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};