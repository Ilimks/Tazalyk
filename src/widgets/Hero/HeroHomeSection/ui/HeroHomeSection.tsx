'use client';
import { useEffect, useRef, useState } from 'react';
import { useHeroCarousel } from '../model/useHeroCarousel';
import styles from './HeroHomeSection.module.scss';
import mobile from './HeroHomeSectionMobile.module.scss';

export const HeroHomeSection: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const {
        currentSlide,
        setCurrentSlide,
        slideImages
    } = useHeroCarousel();

    // Проверка ширины экрана
    useEffect(() => {
        const checkWidth = () => {
            setIsMobile(window.innerWidth < 1000);
        };
        
        checkWidth();
        window.addEventListener('resize', checkWidth);
        
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    // Автопрокрутка каждые 5 секунд
    useEffect(() => {
        if (isMobile) return; // На мобильных не крутим
        
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [isMobile, setCurrentSlide, slideImages.length]);

    useEffect(() => {
        if (heroRef.current) {
            heroRef.current.style.backgroundImage = `url(${slideImages[currentSlide]})`;
        }
    }, [currentSlide, slideImages]);

    // Функция для расчета трансформации слайда
    const getSlideTransform = (position: number): string => {
        const radius = 20;
        const angle = position * 47 + 141;
        
        let scale = 1;
        if (position === 0) {
            scale = 3;
        } else if (position === -1 || position === 1) {
            scale = 1.8;
        }
        
        return `rotate(${angle}deg) translateY(${radius}rem) rotate(${-angle}deg) scale(${scale})`;
    };

    // Функция для получения позиции слайда относительно текущего
    const getSlidePosition = (index: number): number => {
        let offset = (index - currentSlide + slideImages.length) % slideImages.length;
        if (offset > slideImages.length / 2) offset -= slideImages.length;
        return offset;
    };

    // Обработчик клика по кружку
    const handleSlideClick = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section 
            ref={heroRef}
            className={`${styles.hero} ${mobile.hero}`}
        >
            {/* Фиксированная панель с текстом */}
            <div className={`${styles.infoPanel} ${isMobile ? styles.infoPanelCentered : ''}`}>
                <h1 className={styles.heroTitle}>ТАЗАЛЫК</h1>
                <p className={styles.heroText}>
                    ЧИСТОТА ГОРОДА — ЕЖЕДНЕВНЫЙ ТРУД НА БЛАГО КАЖДОГО ЖИТЕЛЯ
                </p>
                <button className={styles.heroBtn}>
                    О КОМПАНИИ
                </button>
            </div>

            {/* Круговая карусель - скрывается на ширине меньше 1000px */}
            {!isMobile && (
                <div className={styles.carouselContainer}>
                    <div className={styles.carousel}>
                        {slideImages.map((_, index) => {
                            const position = getSlidePosition(index);
                            if (position >= -2 && position <= 2) {
                                return (
                                    <div
                                        key={index}
                                        className={`${styles.slide} ${
                                            index === currentSlide ? styles.active : ''
                                        }`}
                                        style={{
                                            backgroundImage: `url(${slideImages[index]})`,
                                            transform: getSlideTransform(position)
                                        }}
                                        onClick={() => handleSlideClick(index)}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            )}
        </section>
    );
};