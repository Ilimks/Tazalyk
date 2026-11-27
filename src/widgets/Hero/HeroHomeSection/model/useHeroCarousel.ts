import { useState, useCallback, useRef } from 'react';
import { getImageProps } from 'next/image';

const SLIDES = [1, 2, 3, 4, 5, 6, 7];
const slideImages = SLIDES.map((n) => `/assets/images/hero/hero-${n}.webp`);

const slideThumbs = SLIDES.map(
    (n) => getImageProps({ src: `/assets/images/hero/thumb-${n}.webp`, alt: '', width: 320, height: 320 }).props.src
);

export const useHeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    const stopAutoPlay = useCallback(() => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    }, []);

    const startAutoPlay = useCallback((intervalTime: number = 5000) => {
        stopAutoPlay();
        autoPlayRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        }, intervalTime);
    }, [stopAutoPlay]);

    const handleSlideClick = useCallback((index: number) => {
        setCurrentSlide(index);
        stopAutoPlay();
        setTimeout(() => {
            startAutoPlay();
        }, 1000);
    }, [stopAutoPlay, startAutoPlay]);

    return {
        currentSlide,
        setCurrentSlide,
        slideImages,
        slideThumbs,
        handleSlideClick,
        startAutoPlay,
        stopAutoPlay
    };
};