'use client'
import { useState } from 'react';
import { Loading } from '@/shared/ui/Loading';
import { useContactData } from '@/entities/contacts';
import styles from './ContactsMap.module.scss';

type MapLocation = {
    id: number;
    lat: number;
    lon: number;
    name: string;
    address: string;
};

export const ContactsMap: React.FC = () => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const { mapLocations } = useContactData();

    const points = mapLocations.map((loc: MapLocation) => `${loc.lon}%2C${loc.lat}%2Cpm2rdl`).join('~');
    const mapUrl = `https://yandex.ru/map-widget/v1/?ll=74.5776%2C42.8729&z=14&pt=${points}`;

    return (
        <div className={styles.mapContainer}>
            <div className={styles.mapWrapper}>
                {!mapLoaded && (
                    <div className={styles.mapLoader}>
                        <Loading />
                    </div>
                )}
                <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    onLoad={() => setMapLoaded(true)}
                    style={{ opacity: mapLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
                    title="Карта местоположения МП Тазалык"
                />
            </div>
        </div>
    );
};