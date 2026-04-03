'use client'
import { useState } from 'react';
import styles from './StructureActivityPage.module.scss';

interface Department {
    id: number;
    name: string;
    description: string;
    head: string;
    subDepartments?: string[];
    image?: string;
}

interface Activity {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    details: string[];
    image?: string;
}

const departments: Department[] = [
    {
        id: 1,
        name: "Дирекция",
        description: "Общее руководство предприятием, стратегическое планирование и контроль",
        head: "Раимбеков Уран Камилжанович",
        subDepartments: [
            "Отдел планирования и развития",
            "Юридический отдел",
            "Отдел кадров",
            "Бухгалтерия"
        ]
    },
    {
        id: 2,
        name: "Производственно-технический отдел",
        description: "Организация производственных процессов, контроль качества услуг",
        head: "Кайдуев Нурлан Кенешевич",
        subDepartments: [
            "Служба механизации",
            "Ремонтная служба",
            "Диспетчерская служба"
        ]
    },
    {
        id: 3,
        name: "Автотранспортный цех",
        description: "Обслуживание и эксплуатация спецтехники, организация вывоза отходов",
        head: "Сарыкеев Шаршенбек Мамытович",
        subDepartments: [
            "Гаражная служба",
            "Служба ГСМ",
            "Ремонтная мастерская"
        ]
    },
    {
        id: 4,
        name: "Служба благоустройства",
        description: "Санитарная очистка, уборка улиц, озеленение города",
        head: "Абасбекова Айда Кудайкуловна",
        subDepartments: [
            "Участок механизированной уборки",
            "Участок ручной уборки",
            "Служба озеленения"
        ]
    },
    {
        id: 5,
        name: "Центр сбыта",
        description: "Работа с населением, заключение договоров, расчеты",
        head: "Исмаилов Бакыт Токтосунович",
        subDepartments: [
            "Абонентский отдел",
            "Отдел по работе с юридическими лицами",
            "Расчетный отдел"
        ]
    },
    {
        id: 6,
        name: "Экологический отдел",
        description: "Контроль соблюдения экологических норм, внедрение технологий",
        head: "Аманбаева Жылдыз Асанкановна",
        subDepartments: [
            "Лаборатория экологического контроля",
            "Отдел переработки отходов"
        ]
    }
];

const activities: Activity[] = [
    {
        id: 1,
        title: "Санитарная очистка города",
        description: "Вывоз и утилизация твердых бытовых отходов",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9l9-6 9 6v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
        ),
        details: [
            "Ежедневный вывоз ТБО из жилого сектора",
            "Вывоз крупногабаритных отходов",
            "Своевременная утилизация на полигоне",
            "Контроль качества услуг"
        ]
    },
    {
        id: 2,
        title: "Механизированная уборка улиц",
        description: "Подметание, мойка и полив дорог",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.18A3 3 0 0 0 8.18 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 11v4M12 19h.01" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
        ),
        details: [
            "Подметание дорог и тротуаров",
            "Мойка проезжей части",
            "Полив зеленых насаждений",
            "Уборка общественных пространств"
        ]
    },
    {
        id: 3,
        title: "Зимнее содержание дорог",
        description: "Уборка снега и обработка противогололедными материалами",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
        ),
        details: [
            "Очистка дорог от снега",
            "Посыпка противогололедными материалами",
            "Вывоз снега с улиц",
            "Круглосуточное дежурство техники"
        ]
    },
    {
        id: 4,
        title: "Благоустройство и озеленение",
        description: "Посадка деревьев, уход за зелеными насаждениями",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
        ),
        details: [
            "Посадка деревьев и кустарников",
            "Стрижка газонов и живых изгородей",
            "Уход за цветниками",
            "Полив зеленых насаждений"
        ]
    },
    {
        id: 5,
        title: "Вывоз жидких бытовых отходов",
        description: "Откачка и вывоз ЖБО из частного сектора",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9l9-6 9 6v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
        ),
        details: [
            "Откачка выгребных ям",
            "Вывоз жидких отходов на полигон",
            "Соблюдение санитарных норм",
            "Обслуживание частного сектора"
        ]
    },
    {
        id: 6,
        title: "Раздельный сбор отходов",
        description: "Внедрение системы раздельного сбора и переработки",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.18A3 3 0 0 0 8.18 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 11v4M12 19h.01" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
        ),
        details: [
            "Установка контейнеров для раздельного сбора",
            "Сортировка отходов",
            "Переработка вторсырья",
            "Экологическое просвещение населения"
        ]
    }
];

export const StructureActivityPage: React.FC = () => {
    const [expandedDept, setExpandedDept] = useState<number | null>(null);

    const toggleDepartment = (id: number) => {
        setExpandedDept(expandedDept === id ? null : id);
    };

    return (
        <section className={styles.structureActivity}>
            <div className='container'>
                {/* Заголовок страницы */}
                <div className={styles.pageHeader}>
                    <div className={styles.pageTitleWrapper}>
                        <h1 className={styles.pageTitle}>
                            Структура и деятельность
                        </h1>
                    </div>
                    <p className={styles.pageDescription}>
                        Организационная структура и основные направления деятельности МП "Тазалык"
                    </p>
                </div>

                {/* Организационная структура */}
                <div className={styles.structureSection}>
                    <h2 className={styles.sectionTitle}>
                        <span>Организационная структура</span>
                    </h2>
                    <div className={styles.structureGrid}>
                        {/* Генеральная дирекция */}
                        <div className={styles.structureCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L15 8H9L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
                                        <path d="M5 8H19L17 22H7L5 8Z" stroke="currentColor" strokeWidth="1.5"/>
                                    </svg>
                                </div>
                                <h3>Генеральная дирекция</h3>
                            </div>
                            <p>Общее руководство и стратегическое развитие предприятия</p>
                            <div className={styles.cardFooter}>
                                <div className={styles.directorInfo}>
                                    <span className={styles.label}>Директор:</span>
                                    <span className={styles.value}>Раимбеков У.К.</span>
                                </div>
                            </div>
                        </div>

                        {/* Отделы */}
                        <div className={styles.departmentsGrid}>
                            {departments.map((dept) => (
                                <div key={dept.id} className={styles.departmentCard}>
                                    <div className={styles.departmentHeader}>
                                        <div className={styles.departmentIcon}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 7h-4.18A3 3 0 0 0 16 5.18V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1.18A3 3 0 0 0 8.18 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="1.5"/>
                                            </svg>
                                        </div>
                                        <h4>{dept.name}</h4>
                                        <button 
                                            className={styles.expandBtn}
                                            onClick={() => toggleDepartment(dept.id)}
                                        >
                                            {expandedDept === dept.id ? '−' : '+'}
                                        </button>
                                    </div>
                                    <p>{dept.description}</p>
                                    <div className={styles.headInfo}>
                                        <span>Руководитель:</span>
                                        <strong>{dept.head}</strong>
                                    </div>
                                    {expandedDept === dept.id && dept.subDepartments && (
                                        <div className={styles.subDepartments}>
                                            <span className={styles.subTitle}>Подразделения:</span>
                                            <ul>
                                                {dept.subDepartments.map((sub, idx) => (
                                                    <li key={idx}>{sub}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Направления деятельности */}
                <div className={styles.activitySection}>
                    <h2 className={styles.sectionTitle}>
                        <span>Направления деятельности</span>
                    </h2>
                    <div className={styles.activityGrid}>
                        {activities.map((activity) => (
                            <div key={activity.id} className={styles.activityCard}>
                                <div className={styles.activityIcon}>
                                    {activity.icon}
                                </div>
                                <h3>{activity.title}</h3>
                                <p>{activity.description}</p>
                                <div className={styles.activityDetails}>
                                    <ul>
                                        {activity.details.map((detail, idx) => (
                                            <li key={idx}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Схема управления */}
                <div className={styles.schemeSection}>
                    <h2 className={styles.sectionTitle}>
                        <span>Схема управления</span>
                    </h2>
                    <div className={styles.orgChart}>
                        <div className={styles.orgLevel}>
                            <div className={styles.orgNode}>Генеральный директор</div>
                        </div>
                        <div className={styles.orgLevel}>
                            <div className={styles.orgNode}>Заместитель директора</div>
                            <div className={styles.orgNode}>Главный инженер</div>
                            <div className={styles.orgNode}>Заместитель директора</div>
                        </div>
                        <div className={styles.orgLevel}>
                            <div className={styles.orgNode}>Производственный отдел</div>
                            <div className={styles.orgNode}>Технический отдел</div>
                            <div className={styles.orgNode}>Центр сбыта</div>
                            <div className={styles.orgNode}>Экологический отдел</div>
                            <div className={styles.orgNode}>Автотранспортный цех</div>
                            <div className={styles.orgNode}>Служба благоустройства</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};