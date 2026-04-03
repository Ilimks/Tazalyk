// Заголовок страницы
export const pageHeader = {
    title: 'Контакты',
    description: 'Свяжитесь с нами для получения дополнительной информации о деятельности муниципального предприятия "Тазалык"'
};

// Дополнительная информация
export const additionalInfo = {
    title: 'Отдел по работе с обращениями граждан',
    text: 'По всем вопросам и обращениям вы можете связаться с нами по телефону горячей линии: +996 (312) 12-34-56 или написать на почту info@tazalyk.kg'
};

// Контактные данные
export const contactItems = [
    {
        id: 1,
        icon: 'phone',
        title: 'Телефоны',
        details: ['+996 (312) 12-34-56', '+996 (700) 12-34-56', '+996 (770) 12-34-56'],
        link: 'tel:+996312123456',
        linkText: 'Позвонить'
    },
    {
        id: 2,
        icon: 'email',
        title: 'Электронная почта',
        details: ['info@tazalyk.kg', 'zakupki@tazalyk.kg'],
        link: 'mailto:info@tazalyk.kg',
        linkText: 'Написать'
    },
    {
        id: 3,
        icon: 'location',
        title: 'Адрес',
        details: ['г. Бишкек, ул. Московская, 123', '720040, Кыргызская Республика'],
        link: 'https://maps.google.com/?q=Бишкек+Московская+123',
        linkText: 'Построить маршрут'
    },
    {
        id: 4,
        icon: 'schedule',
        title: 'График работы',
        details: ['Понедельник - Пятница: 09:00 - 18:00', 'Суббота - Воскресенье: Выходной']
    },
    {
        id: 5,
        icon: 'social',
        title: 'Социальные сети',
        details: ['Instagram', 'Facebook', 'Telegram'],
        link: 'https://instagram.com',
        linkText: 'Подписаться'
    }
];

// Координаты для карты
export const mapLocations = [
    {
        id: 1,
        lat: 42.8746,
        lon: 74.5697,
        name: 'МП "Тазалык" - Центральный офис',
        address: 'г. Бишкек, ул. Московская, 160'
    },
    {
        id: 2,
        lat: 42.8712,
        lon: 74.5856,
        name: 'МП "Тазалык" - База №2',
        address: 'г. Бишкек, ул. Жукеева-Пудовкина, 2/1'
    }
];

// График приема граждан
export const receptionSchedule = {
    title: 'График приема граждан',
    schedule: [
        { day: 'Понедельник', time: '14:00 - 17:00', office: 'Кабинет 101' },
        { day: 'Среда', time: '14:00 - 17:00', office: 'Кабинет 101' },
        { day: 'Пятница', time: '09:00 - 12:00', office: 'Кабинет 101' }
    ],
    note: 'Предварительная запись по телефону: +996 (312) 56-88-22',
    address: 'г. Бишкек, ул. Московская, 160, 1 этаж'
};