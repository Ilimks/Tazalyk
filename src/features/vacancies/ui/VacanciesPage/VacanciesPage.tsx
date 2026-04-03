'use client'
import { useState, useEffect } from 'react';
import styles from './VacanciesPage.module.scss';

interface Vacancy {
    id: number;
    title: string;
    department: string;
    salary: string;
    experience: string;
    employment: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    conditions: string[];
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

// Временные данные для примера (позже будут приходить из API)
const initialVacanciesData: Vacancy[] = [
    {
        id: 1,
        title: 'Водитель спецтехники',
        department: 'Автотранспортный цех',
        salary: 'от 25 000 до 35 000 сом',
        experience: 'от 3 лет',
        employment: 'Полная занятость',
        description: 'Требуется опытный водитель для работы на мусоровозе и другой специализированной технике.',
        requirements: [
            'Наличие водительского удостоверения категории C',
            'Опыт работы на спецтехнике от 3 лет',
            'Знание ПДД и технического устройства автомобиля',
            'Ответственность, дисциплинированность',
            'Наличие медицинской справки'
        ],
        responsibilities: [
            'Управление мусоровозом и спецтехникой',
            'Соблюдение маршрутов и графиков вывоза отходов',
            'Контроль технического состояния автомобиля',
            'Ведение путевой документации'
        ],
        conditions: [
            'Официальное трудоустройство',
            'Своевременная выплата заработной платы',
            'Социальный пакет',
            'Возможность профессионального роста'
        ],
        isActive: true,
        createdAt: '2024-01-15T10:00:00Z'
    },
    {
        id: 2,
        title: 'Слесарь-ремонтник',
        department: 'Ремонтная служба',
        salary: 'от 20 000 до 28 000 сом',
        experience: 'от 2 лет',
        employment: 'Полная занятость',
        description: 'В ремонтную службу требуется слесарь-ремонтник для обслуживания спецтехники и оборудования.',
        requirements: [
            'Среднее специальное образование',
            'Опыт работы слесарем от 2 лет',
            'Знание устройства спецтехники',
            'Умение работать с инструментом',
            'Наличие разряда (3-5 разряд)'
        ],
        responsibilities: [
            'Ремонт и техническое обслуживание спецтехники',
            'Диагностика неисправностей',
            'Плановое ТО автомобилей',
            'Ведение документации по ремонту'
        ],
        conditions: [
            'Официальное трудоустройство',
            'Стабильная заработная плата',
            'Спецодежда и инвентарь',
            'График 5/2'
        ],
        isActive: true,
        createdAt: '2024-01-20T10:00:00Z'
    },
    {
        id: 3,
        title: 'Дворник',
        department: 'Служба благоустройства',
        salary: 'от 12 000 до 18 000 сом',
        experience: 'Без опыта',
        employment: 'Полная занятость',
        description: 'Требуются дворники для уборки придомовых территорий и улиц города.',
        requirements: [
            'Ответственность',
            'Дисциплинированность',
            'Физическая выносливость',
            'Желание работать'
        ],
        responsibilities: [
            'Уборка закрепленных территорий',
            'Сбор и вывоз мусора',
            'Сезонная уборка (снег, листва)',
            'Поддержание чистоты'
        ],
        conditions: [
            'Официальное трудоустройство',
            'Спецодежда и инвентарь',
            'График работы 5/2',
            'Премии по результатам работы'
        ],
        isActive: true,
        createdAt: '2024-02-01T10:00:00Z'
    },
    {
        id: 4,
        title: 'Инженер-эколог',
        department: 'Экологический отдел',
        salary: 'от 30 000 до 40 000 сом',
        experience: 'от 3 лет',
        employment: 'Полная занятость',
        description: 'В экологический отдел требуется инженер-эколог для контроля соблюдения природоохранного законодательства.',
        requirements: [
            'Высшее экологическое образование',
            'Опыт работы от 3 лет',
            'Знание природоохранного законодательства',
            'Навыки составления отчетности',
            'Владение ПК на уровне продвинутого пользователя'
        ],
        responsibilities: [
            'Контроль соблюдения экологических норм',
            'Составление экологической отчетности',
            'Разработка природоохранных мероприятий',
            'Взаимодействие с контролирующими органами'
        ],
        conditions: [
            'Официальное трудоустройство',
            'Полный социальный пакет',
            'Карьерный рост',
            'График 5/2'
        ],
        isActive: true,
        createdAt: '2024-02-10T10:00:00Z'
    },
    {
        id: 5,
        title: 'Начальник участка',
        department: 'Производственный отдел',
        salary: 'от 40 000 сом',
        experience: 'от 5 лет',
        employment: 'Полная занятость',
        description: 'Требуется начальник участка для организации работы по вывозу твердых бытовых отходов.',
        requirements: [
            'Высшее техническое образование',
            'Опыт руководства от 5 лет',
            'Знание спецтехники',
            'Навыки управления персоналом',
            'Умение работать с документацией'
        ],
        responsibilities: [
            'Организация работы участка',
            'Контроль выполнения планов',
            'Управление персоналом',
            'Взаимодействие с другими подразделениями',
            'Составление отчетности'
        ],
        conditions: [
            'Официальное трудоустройство',
            'Премии по результатам работы',
            'Служебный автомобиль',
            'Полный социальный пакет'
        ],
        isActive: false,
        createdAt: '2024-02-15T10:00:00Z'
    }
];

export const VacanciesPage: React.FC = () => {
    const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
    const [activeFilter, setActiveFilter] = useState<'all' | 'active'>('all');
    const [vacancies, setVacancies] = useState<Vacancy[]>(initialVacanciesData);
    const [isLoading, setIsLoading] = useState(false);

    // Загрузка вакансий из API (будет использоваться позже)
    useEffect(() => {
        // Здесь будет запрос к API для получения вакансий
        // fetchVacancies();
    }, []);

    // Функция для загрузки вакансий из API
    const fetchVacancies = async () => {
        setIsLoading(true);
        try {
            // const response = await fetch('/api/vacancies');
            // const data = await response.json();
            // setVacancies(data);
            
            // Имитация загрузки
            setTimeout(() => {
                setVacancies(initialVacanciesData);
                setIsLoading(false);
            }, 500);
        } catch (error) {
            console.error('Ошибка при загрузке вакансий:', error);
            setIsLoading(false);
        }
    };

    // Функция для обновления вакансий (будет вызываться из админ-панели)
    const updateVacancies = (newVacancies: Vacancy[]) => {
        setVacancies(newVacancies);
    };

    // Функция для добавления новой вакансии
    const addVacancy = (vacancy: Omit<Vacancy, 'id' | 'createdAt'>) => {
        const newVacancy: Vacancy = {
            ...vacancy,
            id: Date.now(),
            createdAt: new Date().toISOString(),
        };
        setVacancies([...vacancies, newVacancy]);
        
        // Здесь будет API запрос для сохранения
        // await fetch('/api/vacancies', { method: 'POST', body: JSON.stringify(newVacancy) });
    };

    // Функция для удаления вакансии
    const deleteVacancy = (id: number) => {
        if (confirm('Вы уверены, что хотите удалить эту вакансию?')) {
            setVacancies(vacancies.filter(v => v.id !== id));
            
            // Здесь будет API запрос для удаления
            // await fetch(`/api/vacancies/${id}`, { method: 'DELETE' });
        }
    };

    // Функция для обновления вакансии
    const updateVacancy = (id: number, updatedData: Partial<Vacancy>) => {
        setVacancies(vacancies.map(v => 
            v.id === id ? { ...v, ...updatedData, updatedAt: new Date().toISOString() } : v
        ));
        
        // Здесь будет API запрос для обновления
        // await fetch(`/api/vacancies/${id}`, { method: 'PUT', body: JSON.stringify(updatedData) });
    };

    const filteredVacancies = vacancies.filter(vacancy => 
        activeFilter === 'all' ? true : vacancy.isActive
    );

    // Форматирование даты
    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <section className={styles.vacancies}>
                <div className={styles.container}>
                    <div className={styles.loader}>
                        <div className={styles.spinner}></div>
                        <p>Загрузка вакансий...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.vacancies}>
            <div className='container'>
                <div className={styles.header}>
                    <h2 className={styles.title}>Вакансии</h2>
                    <p className={styles.description}>
                        Присоединяйтесь к команде МП "Тазалык"! Мы предлагаем стабильную работу, 
                        официальное трудоустройство и возможности для профессионального развития.
                    </p>
                </div>

                <div className={styles.filters}>
                    <button
                        className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        Все вакансии ({vacancies.length})
                    </button>
                    <button
                        className={`${styles.filterBtn} ${activeFilter === 'active' ? styles.active : ''}`}
                        onClick={() => setActiveFilter('active')}
                    >
                        Актуальные ({vacancies.filter(v => v.isActive).length})
                    </button>
                </div>

                {filteredVacancies.length === 0 ? (
                    <div className={styles.emptyState}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.18A3 3 0 0 0 8.18 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 11v4M12 19h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h3>Нет активных вакансий</h3>
                        <p>В данный момент нет открытых вакансий. Пожалуйста, зайдите позже.</p>
                    </div>
                ) : (
                    <div className={styles.vacanciesGrid}>
                        {filteredVacancies.map((vacancy) => (
                            <div key={vacancy.id} className={styles.vacancyCard}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardTitleWrapper}>
                                        <h3 className={styles.vacancyTitle}>{vacancy.title}</h3>
                                        {!vacancy.isActive && (
                                            <span className={styles.closedBadge}>Закрыта</span>
                                        )}
                                    </div>
                                    <div className={styles.vacancyMeta}>
                                        <span className={styles.department}>{vacancy.department}</span>
                                        <span className={styles.salary}>{vacancy.salary}</span>
                                    </div>
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.infoRow}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 8v4l3 3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>Опыт: {vacancy.experience}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.18A3 3 0 0 0 8.18 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>Занятость: {vacancy.employment}</span>
                                    </div>
                                    <p className={styles.vacancyDescription}>{vacancy.description}</p>
                                    
                                    <button 
                                        className={styles.detailsBtn}
                                        onClick={() => setSelectedVacancy(vacancy)}
                                    >
                                        Подробнее
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Модальное окно с деталями вакансии */}
                {selectedVacancy && (
                    <div className={styles.modal} onClick={() => setSelectedVacancy(null)}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.modalClose} onClick={() => setSelectedVacancy(null)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            
                            <h3 className={styles.modalTitle}>{selectedVacancy.title}</h3>
                            
                            <div className={styles.modalMeta}>
                                <span>{selectedVacancy.department}</span>
                                <span>{selectedVacancy.salary}</span>
                            </div>

                            {selectedVacancy.createdAt && (
                                <div className={styles.modalDate}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 4h-2V2h-2v2H9V2H7v2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM8 2v2M16 2v2M3 8h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    <span>Опубликовано: {formatDate(selectedVacancy.createdAt)}</span>
                                </div>
                            )}

                            <div className={styles.modalSection}>
                                <h4>Описание вакансии</h4>
                                <p>{selectedVacancy.description}</p>
                            </div>

                            <div className={styles.modalSection}>
                                <h4>Требования</h4>
                                <ul>
                                    {selectedVacancy.requirements.map((req, idx) => (
                                        <li key={idx}>{req}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.modalSection}>
                                <h4>Обязанности</h4>
                                <ul>
                                    {selectedVacancy.responsibilities.map((resp, idx) => (
                                        <li key={idx}>{resp}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.modalSection}>
                                <h4>Условия работы</h4>
                                <ul>
                                    {selectedVacancy.conditions.map((cond, idx) => (
                                        <li key={idx}>{cond}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};