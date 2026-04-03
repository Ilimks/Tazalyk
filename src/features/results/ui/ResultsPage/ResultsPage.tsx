'use client'
import { useState } from 'react';
import styles from './ResultsPage.module.scss';

interface ResultItem {
    id: number;
    year: string;
    title: string;
    description: string;
    image?: string;
    stats: {
        label: string;
        value: string;
        icon?: string;
    }[];
    achievements: string[];
    isActive: boolean;
    createdAt?: string;
}

interface ResultsData {
    id: number;
    title: string;
    description: string;
    currentYear: string;
    overallStats: {
        label: string;
        value: string;
        change: string;
    }[];
    results: ResultItem[];
    updatedAt?: string;
}

// Данные для примера
const resultsData: ResultsData = {
    id: 1,
    title: "Итоги работы МП 'Тазалык'",
    description: "Основные показатели деятельности предприятия по обеспечению чистоты и порядка в городе Бишкек",
    currentYear: "2024",
    overallStats: [
        {
            label: "Вывезено отходов",
            value: "520 000",
            change: "+12%"
        },
        {
            label: "Обслужено техники",
            value: "500+",
            change: "+8%"
        },
        {
            label: "Охват территории",
            value: "100%",
            change: "0%"
        },
        {
            label: "Удовлетворенность",
            value: "94%",
            change: "+5%"
        }
    ],
    results: [
        {
            id: 1,
            year: "2024",
            title: "Основные показатели 2024 года",
            description: "В 2024 году предприятие достигло значительных результатов в сфере санитарной очистки города",
            image: "/images/results/2024.jpg",
            stats: [
                { label: "Вывезено ТБО", value: "520 000 тонн" },
                { label: "Новая техника", value: "50 единиц" },
                { label: "Обслужено дворов", value: "8 500" },
                { label: "Посажено деревьев", value: "3 200" }
            ],
            achievements: [
                "Приобретение 50 единиц новой спецтехники",
                "Увеличение охвата территории до 100%",
                "Внедрение системы GPS-мониторинга",
                "Запуск мобильного приложения для жителей"
            ],
            isActive: true
        },
        {
            id: 2,
            year: "2023",
            title: "Итоги 2023 года",
            description: "Успешная модернизация автопарка и расширение спектра услуг",
            image: "/images/results/2023.jpg",
            stats: [
                { label: "Вывезено ТБО", value: "480 000 тонн" },
                { label: "Новая техника", value: "35 единиц" },
                { label: "Обслужено дворов", value: "7 800" },
                { label: "Посажено деревьев", value: "2 500" }
            ],
            achievements: [
                "Обновление автопарка на 35 единиц",
                "Внедрение раздельного сбора отходов в 50 дворах",
                "Установка 200 новых контейнеров",
                "Проведение 500 рейдов по санитарной очистке"
            ],
            isActive: true
        },
        {
            id: 3,
            year: "2022",
            title: "Достижения 2022 года",
            description: "Расширение зоны обслуживания и улучшение качества услуг",
            image: "/images/results/2022.jpg",
            stats: [
                { label: "Вывезено ТБО", value: "450 000 тонн" },
                { label: "Новая техника", value: "25 единиц" },
                { label: "Обслужено дворов", value: "7 200" },
                { label: "Посажено деревьев", value: "2 000" }
            ],
            achievements: [
                "Увеличение парка техники на 25 единиц",
                "Охват всех районов города",
                "Снижение жалоб на 30%",
                "Проведение 300 экологических акций"
            ],
            isActive: false
        }
    ],
    updatedAt: "2024-01-15T10:00:00Z"
};

export const ResultsPage: React.FC = () => {
    const [data] = useState<ResultsData>(resultsData);
    const [selectedYear, setSelectedYear] = useState<string>('2024');

    const getCurrentYearResults = () => {
        return data.results.find(r => r.year === selectedYear) || data.results.find(r => r.isActive);
    };

    const currentYearResults = getCurrentYearResults();

    const handleYearChange = (year: string) => {
        setSelectedYear(year);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <section className={styles.results}>
            <div className='container'>
                {/* Заголовок страницы */}
                <div className={styles.pageHeader}>
                    <div className={styles.pageTitleWrapper}>
                        <h1 className={styles.pageTitle}>
                            Итоги работы
                        </h1>
                    </div>
                    <p className={styles.pageDescription}>
                        Основные показатели деятельности предприятия по обеспечению чистоты и порядка в городе Бишкек
                    </p>
                    {data.updatedAt && (
                        <div className={styles.updateInfo}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            <span>Обновлено: {formatDate(data.updatedAt)}</span>
                        </div>
                    )}
                </div>

                {/* Общая статистика */}
                <div className={styles.statsGrid}>
                    {data.overallStats.map((stat, index) => (
                        <div key={index} className={styles.statCard}>
                            <div className={styles.statValue}>{stat.value}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                            {stat.change && (
                                <div className={`${styles.statChange} ${stat.change.startsWith('+') ? styles.positive : styles.negative}`}>
                                    {stat.change} к прошлому году
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Выбор года */}
                <div className={styles.yearSelector}>
                    <h3>Годы работы</h3>
                    <div className={styles.yearButtons}>
                        {data.results.map(result => (
                            <button
                                key={result.year}
                                className={`${styles.yearBtn} ${selectedYear === result.year ? styles.active : ''}`}
                                onClick={() => handleYearChange(result.year)}
                            >
                                {result.year}
                                {!result.isActive && <span className={styles.closedBadge}>Архив</span>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Результаты выбранного года */}
                {currentYearResults && (
                    <div className={styles.resultsContent}>
                        <div className={styles.resultsHeader}>
                            <h2>{currentYearResults.title}</h2>
                            <p>{currentYearResults.description}</p>
                        </div>

                        {currentYearResults.image && (
                            <div className={styles.resultsImage}>
                                <img 
                                    src={currentYearResults.image} 
                                    alt={currentYearResults.title}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}

                        <div className={styles.statsSection}>
                            <h3>Ключевые показатели</h3>
                            <div className={styles.resultsStats}>
                                {currentYearResults.stats.map((stat, index) => (
                                    <div key={index} className={styles.resultStat}>
                                        <div className={styles.resultStatValue}>{stat.value}</div>
                                        <div className={styles.resultStatLabel}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.achievementsSection}>
                            <h3>Основные достижения</h3>
                            <ul className={styles.achievementsList}>
                                {currentYearResults.achievements.map((achievement, index) => (
                                    <li key={index}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        {achievement}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};