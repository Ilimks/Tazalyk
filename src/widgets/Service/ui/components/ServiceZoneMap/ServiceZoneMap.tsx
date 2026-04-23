'use client'
import { useEffect, useRef, useState } from 'react';
import { Loading } from '@/shared/ui/Loading';
import { bishkekBoundary, districts, markers } from '../../../model/bishkekBoundary';
import styles from './ServiceZoneMap.module.scss';

declare global {
    interface Window {
        ymaps: any;
    }
}

export const ServiceZoneMap: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        const loadYandexMap = () => {
            if (typeof window !== 'undefined' && !window.ymaps) {
                const script = document.createElement('script');
                // Без API ключа
                script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
                script.async = true;
                script.onload = initMap;
                document.body.appendChild(script);
            } else if (window.ymaps) {
                initMap();
            }
        };

        const initMap = () => {
            if (!mapRef.current) return;

            window.ymaps.ready(() => {
                // Создаем карту
                const map = new window.ymaps.Map(mapRef.current, {
                    center: [42.8746, 74.5697],
                    zoom: 12,
                    controls: ['zoomControl', 'fullscreenControl']
                });

                // Рисуем границу города
                const cityBoundary = new window.ymaps.Polygon(
                    [[bishkekBoundary]],
                    {
                        hintContent: 'Граница города Бишкек',
                        balloonContent: '<strong>Граница города Бишкек</strong><br/>Зона обслуживания МП "Тазалык"'
                    },
                    {
                        fillColor: '#22c55e33',
                        strokeColor: '#22c55e',
                        strokeWidth: 3,
                        strokeOpacity: 0.9,
                        fillOpacity: 0.2
                    }
                );
                map.geoObjects.add(cityBoundary);

                // Добавляем метки районов
                districts.forEach(district => {
                    const districtLabel = new window.ymaps.Placemark(
                        district.center,
                        {
                            hintContent: district.name,
                            balloonContent: `<strong>${district.name}</strong><br/>Входит в зону обслуживания`
                        },
                        {
                            preset: 'islands#circleIcon',
                            iconColor: district.color,
                            iconLayout: 'default#imageWithContent',
                            iconContent: district.name.charAt(0),
                            iconContentSize: [24, 24],
                            iconContentOffset: [-12, -12]
                        }
                    );
                    map.geoObjects.add(districtLabel);
                });

                // Добавляем маркеры
                markers.forEach(marker => {
                    let preset = 'islands#redCircleIcon';
                    
                    switch (marker.type) {
                        case 'office':
                            preset = 'islands#blueCircleIcon';
                            break;
                        case 'base':
                            preset = 'islands#greenCircleIcon';
                            break;
                        case 'sorting':
                            preset = 'islands#orangeCircleIcon';
                            break;
                        case 'landfill':
                            preset = 'islands#purpleCircleIcon';
                            break;
                    }

                    const placemark = new window.ymaps.Placemark(
                        marker.coords,
                        {
                            hintContent: marker.name,
                            balloonContent: `<strong>${marker.name}</strong><br/>${marker.address}<br/>✓ В зоне обслуживания`
                        },
                        {
                            preset: preset,
                            balloonCloseButton: true
                        }
                    );
                    map.geoObjects.add(placemark);
                });

                setMapLoaded(true);
            });
        };

        loadYandexMap();
    }, []);

    return (
        <section className={styles.map}>
            <div className="container">
                <div className={styles.mapContainer}>
                    {!mapLoaded && (
                        <div className={styles.mapLoader}>
                            <Loading />
                            <p>Загрузка карты...</p>
                        </div>
                    )}
                    <div 
                        ref={mapRef} 
                        className={styles.mapWrapper}
                        style={{ display: mapLoaded ? 'block' : 'none' }}
                    />
                </div>
            </div>
        </section>
    );
};