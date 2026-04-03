import { useState, useCallback, useEffect, useRef } from 'react';

const slideImages = [
    "/assets/images/Slide1.jpg",
    "/assets/images/Slide2.jpg",
    "/assets/images/Slide3.jpg",
    "/assets/images/Slide4.jpg",
    "/assets/images/Slide5.jpg",
    "/assets/images/Slide6.jpg",
    "/assets/images/Slide7.jpg",
    "/assets/images/Slide8.png",
    "/assets/images/Slide9.png",
    "/assets/images/Slide10.png",
    "/assets/images/Slide11.jpg",
    "/assets/images/Slide12.png"
];

export const useHeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    // Функция для остановки автопрокрутки при взаимодействии
    const stopAutoPlay = useCallback(() => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    }, []);

    // Функция для запуска автопрокрутки
    const startAutoPlay = useCallback((intervalTime: number = 5000) => {
        stopAutoPlay();
        autoPlayRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        }, intervalTime);
    }, [stopAutoPlay]);

    // При клике на слайд останавливаем автопрокрутку на 10 секунд
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
        handleSlideClick,
        startAutoPlay,
        stopAutoPlay
    };
};