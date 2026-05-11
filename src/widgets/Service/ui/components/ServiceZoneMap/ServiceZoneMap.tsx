'use client'
import { useEffect, useRef, useState } from 'react';
import { Loading } from '@/shared/ui/Loading';
import { bishkekBoundary, districts } from '../../../model/bishkekBoundary';
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
                    controls: ['zoomControl']
                });

                // ✅ ПРАВИЛЬНЫЙ формат Polygon: массив контуров [[координаты]]
                const polygonContour = [bishkekBoundary];
                
                const cityBoundary = new window.ymaps.Polygon(
                    polygonContour,  // 🔥 теперь правильно: массив из одного контура
                    {
                        hintContent: 'Граница города Бишкек',
                        balloonContent: '<strong>Граница города Бишкек</strong><br/>Зона обслуживания МП "Тазалык"'
                    },
                    {
                        fillColor: 'rgba(255, 0, 0, 0.15)',
                        strokeColor: '#ff0000',
                        strokeWidth: 3,
                        strokeOpacity: 1,
                        strokeStyle: 'dash',
                        fillOpacity: 0.2
                    }
                );
                
                map.geoObjects.add(cityBoundary);
                
                // Автоматически устанавливаем границы карты по полигону
                map.setBounds(cityBoundary.geometry.getBounds(), {
                    checkZoomRange: true,
                    zoomMargin: 30
                });

                // Добавляем метки районов (текстовые, не маркеры предприятий)
                districts.forEach(district => {
                    const districtLabel = new window.ymaps.Placemark(
                        district.center,
                        {
                            hintContent: district.name,
                            balloonContent: `<strong>${district.name}</strong><br/>${district.description}`
                        },
                        {
                            preset: 'islands#circleIcon',
                            iconColor: district.color,
                            iconLayout: 'default#imageWithContent',
                            iconContent: district.name.charAt(0),
                            iconContentSize: [28, 28],
                            iconContentOffset: [-14, -14],
                            iconContentFontSize: 14,
                            iconContentFontWeight: 'bold',
                            iconContentColor: '#ffffff'
                        }
                    );
                    map.geoObjects.add(districtLabel);
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