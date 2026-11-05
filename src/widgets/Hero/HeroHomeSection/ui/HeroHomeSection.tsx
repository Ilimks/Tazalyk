'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useHeroCarousel } from '../model/useHeroCarousel';
import styles from './HeroHomeSection.module.scss';
import mobile from './HeroHomeSectionMobile.module.scss';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

// Фон растягивается как background-size: cover, поэтому на узких высоких экранах
// картинка шире viewport (82vh / 60vh * ~1.5) — sizes учитывает это, чтобы не мылить.
const HERO_IMAGE_SIZES = '(max-width: 480px) 200vw, (max-width: 1000px) 170vw, 100vw';

export const HeroHomeSection: React.FC = () => {
    const t = useTranslations("Main");
    const [isMobile, setIsMobile] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const {
        currentSlide,
        setCurrentSlide,
        slideImages,
        slideThumbs
    } = useHeroCarousel();

    // Предыдущий слайд остаётся непрозрачным под текущим, пока тот проявляется (кроссфейд 0.8s).
    const [prevSlide, setPrevSlide] = useState<number | null>(null);
    const [shownSlide, setShownSlide] = useState(currentSlide);
    if (shownSlide !== currentSlide) {
        setPrevSlide(shownSlide);
        setShownSlide(currentSlide);
    }

    useEffect(() => {
        const checkWidth = () => {
            setIsMobile(window.innerWidth < 1000);
        };

        checkWidth();
        setIsHydrated(true);
        window.addEventListener('resize', checkWidth);

        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isMobile, setCurrentSlide, slideImages.length]);

    // В DOM только текущий слайд, предыдущий (для кроссфейда) и, на десктопе после
    // гидрации, следующий — он заранее подгружается невидимым. Остальные не качаются.
    const nextSlide = (currentSlide + 1) % slideImages.length;
    const shouldPreloadNext = isHydrated && !isMobile;

    const getBackgroundClass = (index: number): string | null => {
        if (index === currentSlide) {
            return prevSlide === null ? styles.bgCurrent : `${styles.bgCurrent} ${styles.bgFadeIn}`;
        }
        if (index === prevSlide) return styles.bgPrev;
        if (shouldPreloadNext && index === nextSlide) return styles.bgNext;
        return null;
    };

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

    const getSlidePosition = (index: number): number => {
        let offset = (index - currentSlide + slideImages.length) % slideImages.length;
        if (offset > slideImages.length / 2) offset -= slideImages.length;
        return offset;
    };
    const handleSlideClick = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section
            className={`${styles.hero} ${mobile.hero}`}
            // боковая реклама начинается под этим блоком (см. SideAds.module.scss)
            data-fullscreen-hero
        >
            {/* Фон — next/image: первый слайд есть в HTML с сервера и предзагружается (LCP) */}
            <div className={styles.background} aria-hidden="true">
                {slideImages.map((src, index) => {
                    const layerClass = getBackgroundClass(index);
                    if (!layerClass) return null;
                    return (
                        <Image
                            key={src}
                            src={src}
                            alt=""
                            fill
                            sizes={HERO_IMAGE_SIZES}
                            priority={index === 0}
                            fetchPriority={index === 0 ? 'high' : undefined}
                            className={`${styles.bgImage} ${layerClass}`}
                        />
                    );
                })}
            </div>

            <div className={`${styles.infoPanel} ${isMobile ? styles.infoPanelCentered : ''}`}>
                <h1 className={styles.heroTitle}>ТАЗАЛЫК</h1>
                <p className={styles.heroText}>
                    {t('MainHeruDescription')}
                </p>
                <Link href="/history" className={styles.heroBtn}>
                    {t('MainHeroButton')}
                </Link>
            </div>

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
                                            backgroundImage: `url("${slideThumbs[index]}")`,
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