import type { SearchEntry } from './types';

// Разделы, услуги и люди, которые посетитель ищет по названию. Тексты самих страниц — в searchIndex.ts
export const STATIC_ENTRIES: SearchEntry[] = [
    { id: '1', type: 'page', url: '/history', title: 'История предприятия', titleKy: 'Ишкананын тарыхы' },
    { id: '2', type: 'page', url: '/history', title: 'История', titleKy: 'Тарых' },

    { id: '3', type: 'page', url: '/directorate', title: 'Руководство', titleKy: 'Жетекчилик' },
    { id: '4', type: 'page', url: '/directorate', title: 'Директор', titleKy: 'Директор' },
    { id: '5', type: 'page', url: '/directorate', title: 'Дирекция', titleKy: 'Дирекция' },

    { id: '6', type: 'page', url: '/structure', title: 'Структура и деятельность', titleKy: 'Түзүм жана ишмердүүлүк' },
    { id: '7', type: 'page', url: '/structure', title: 'Организационная структура', titleKy: 'Уюштуруу түзүмү' },
    { id: '8', type: 'page', url: '/structure', title: 'Деятельность предприятия', titleKy: 'Ишкананын ишмердүүлүгү' },
    { id: '9', type: 'page', url: '/structure', title: 'Вывоз отходов', titleKy: 'Таштандыларды чыгаруу' },
    { id: '10', type: 'page', url: '/structure', title: 'Санитарная очистка', titleKy: 'Санитардык тазалоо' },
    { id: '11', type: 'page', url: '/structure', title: 'Фонтанные комплексы', titleKy: 'Фонтан комплекстери' },
    { id: '12', type: 'page', url: '/structure', title: 'Снос объектов', titleKy: 'Объекттерди бузуу' },

    { id: '13', type: 'page', url: '/services', title: 'Зона обслуживания', titleKy: 'Тейлөө аймагы' },
    { id: '14', type: 'page', url: '/services', title: 'Зона', titleKy: 'Аймак' },
    { id: '15', type: 'page', url: '/services', title: 'Территория обслуживания', titleKy: 'Тейлөө территориясы' },
    { id: '16', type: 'page', url: '/services', title: 'Территория', titleKy: 'Территория' },

    { id: '17', type: 'page', url: '/vacancies', title: 'Вакансии', titleKy: 'Бош орундар' },

    { id: '18', type: 'page', url: '/tariffs', title: 'Тарифы', titleKy: 'Тарифтер' },
    { id: '19', type: 'page', url: '/tariffs', title: 'Физические лица', titleKy: 'Жеке жактар' },
    { id: '20', type: 'page', url: '/tariffs', title: 'Юридические лица', titleKy: 'Юридикалык жактар' },
    { id: '21', type: 'page', url: '/tariffs', title: 'Сводная таблица тарифов', titleKy: 'Тарифтердин жыйынтык таблицасы' },

    { id: '22', type: 'page', url: '/complaints', title: 'Подать Жалобу', titleKy: 'Арыз берүү' },
    { id: '23', type: 'page', url: '/complaints', title: 'Жалоба', titleKy: 'Арыз' },

    { id: '24', type: 'page', url: '/contacts', title: 'Контакты', titleKy: 'Байланыштар' },
    { id: '25', type: 'page', url: '/contacts', title: 'Телефон', titleKy: 'Телефон' },
    { id: '26', type: 'page', url: '/contacts', title: 'Социальные сети', titleKy: 'Социалдык тармактар' },
    { id: '27', type: 'page', url: '/contacts', title: 'Карта', titleKy: 'Карта' },

    { id: '28', type: 'page', url: '/procurement', title: 'Закупки', titleKy: 'Сатып алуулар' },
    { id: '29', type: 'page', url: '/procurement', title: 'Таблица закупок', titleKy: 'Сатып алуулар таблицасы' },

    { id: '30', type: 'page', url: '/legislation', title: 'Законодательство КР', titleKy: 'КР мыйзамдары' },

    { id: '31', type: 'page', url: '/acts', title: 'Локальные акты', titleKy: 'Жергиликтүү актылар' },

    { id: '32', type: 'service', url: '/attendance', title: 'Услуги ассенизатора', titleKy: 'Ассенизатордун кызматтары' },
    { id: '33', type: 'service', url: '/attendance', title: 'Услуги спецтехники', titleKy: 'Атайын техниканын кызматтары' },
    { id: '34', type: 'service', url: '/attendance', title: 'Услуги по вывозу мусора', titleKy: 'Таштанды чыгаруу кызматтары' },
    { id: '35', type: 'service', url: '/attendance', title: 'Услуги по уборке', titleKy: 'Тазалоо кызматтары' },
    { id: '36', type: 'service', url: '/attendance', title: 'Аренда оборудования', titleKy: 'Жабдууларды ижарага алуу' },
    { id: '37', type: 'service', url: '/attendance', title: 'Установка шатра', titleKy: 'Чатыр орнотуу' },
    { id: '38', type: 'service', url: '/attendance', title: 'Установка подиума', titleKy: 'Подиум орнотуу' },
    { id: '39', type: 'service', url: '/attendance', title: 'Металлические ограждения (2 метр)', titleKy: 'Металл тосмолор (2 метр)' },
    { id: '40', type: 'service', url: '/attendance', title: 'Металлические ограждения (3 метр)', titleKy: 'Металл тосмолор (3 метр)' },
    { id: '41', type: 'service', url: '/attendance', title: 'Пластиковые контейнеры', titleKy: 'Пластик контейнерлер' },
    { id: '42', type: 'service', url: '/attendance', title: 'Биотуалеты (от 4 шт)', titleKy: 'Биотуалеттер (4 даанадан)' },
    { id: '43', type: 'service', url: '/attendance', title: 'Биотуалеты (от 10 дней)', titleKy: 'Биотуалеттер (10 күндөн)' },
    { id: '44', type: 'service', url: '/attendance', title: 'Установка МАФ Костер (24 шт флаг)', titleKy: '«Костер» МАФын орнотуу (24 желек)' },
    { id: '45', type: 'service', url: '/attendance', title: 'Установка МАФ Костер (8 шт флаг)', titleKy: '«Костер» МАФын орнотуу (8 желек)' },
    { id: '46', type: 'service', url: '/attendance', title: 'Биотуалет за чертой города (до 30 км)', titleKy: 'Шаардан тышкары биотуалет (30 км чейин)' },
    { id: '47', type: 'service', url: '/attendance', title: 'Ассенизационная машина (8м³) в пределах города', titleKy: 'Ассенизациялык машина (8м³) шаардын ичинде' },
    { id: '48', type: 'service', url: '/attendance', title: 'Ассенизационная машина (8м³) за городом до 20 км', titleKy: 'Ассенизациялык машина (8м³) шаардан тышкары 20 км чейин' },
    { id: '49', type: 'service', url: '/attendance', title: 'Подметалоуборочная машина DONGFENG в городе', titleKy: 'DONGFENG шыпыруучу-тазалоочу машинасы шаарда' },
    { id: '50', type: 'service', url: '/attendance', title: 'Подметалоуборочная машина DONGFENG за городом', titleKy: 'DONGFENG шыпыруучу-тазалоочу машинасы шаардан тышкары' },
    { id: '51', type: 'service', url: '/attendance', title: 'Трактор Беларусь-320 (очистка снега/мойка)', titleKy: 'Беларусь-320 трактору (кар тазалоо/жуу)' },
    { id: '52', type: 'service', url: '/attendance', title: 'Самосвал ХОВО до 7т (мусор без погрузки)', titleKy: 'ХОВО самосвалы 7т чейин (таштанды, жүктөөсүз)' },
    { id: '53', type: 'service', url: '/attendance', title: 'Самосвал ХОВО до 7т (мусор с погрузкой)', titleKy: 'ХОВО самосвалы 7т чейин (таштанды, жүктөө менен)' },
    { id: '54', type: 'service', url: '/attendance', title: 'Самосвал ГАЗ-53 до 4,5т (без погрузки)', titleKy: 'ГАЗ-53 самосвалы 4,5т чейин (жүктөөсүз)' },
    { id: '56', type: 'service', url: '/attendance', title: 'Самосвал ГАЗ-53 до 4,5т (с погрузкой)', titleKy: 'ГАЗ-53 самосвалы 4,5т чейин (жүктөө менен)' },
    { id: '57', type: 'service', url: '/attendance', title: 'Самосвал ЗИЛ-130 до 4,5т (с погрузкой)', titleKy: 'ЗИЛ-130 самосвалы 4,5т чейин (жүктөө менен)' },
    { id: '58', type: 'service', url: '/attendance', title: 'Самосвал ХОВО/МАЗ 20т (без погрузки)', titleKy: 'ХОВО/МАЗ самосвалы 20т (жүктөөсүз)' },
    { id: '59', type: 'service', url: '/attendance', title: 'Самосвал ХОВО/МАЗ 20т (с погрузкой)', titleKy: 'ХОВО/МАЗ самосвалы 20т (жүктөө менен)' },
    { id: '60', type: 'service', url: '/attendance', title: 'Самосвал ЗИЛ-130 до 4,5т (без погрузки)', titleKy: 'ЗИЛ-130 самосвалы 4,5т чейин (жүктөөсүз)' },
    { id: '61', type: 'service', url: '/attendance', title: 'КДМ МАЗ 5912 (подметание) в городе', titleKy: 'КДМ МАЗ 5912 (шыпыруу) шаарда' },
    { id: '62', type: 'service', url: '/attendance', title: 'КДМ МАЗ 5912 (подметание) за городом', titleKy: 'КДМ МАЗ 5912 (шыпыруу) шаардан тышкары' },
    { id: '63', type: 'service', url: '/attendance', title: 'Перевозка контейнеров и ограждений', titleKy: 'Контейнерлерди жана тосмолорду ташуу' },

    { id: '64', type: 'page', url: '/news', title: 'Новости', titleKy: 'Жаңылыктар' },
    { id: '65', type: 'page', url: '/news', title: 'Все новости', titleKy: 'Бардык жаңылыктар' },
    { id: '66', type: 'page', url: '/news', title: 'Новости и события', titleKy: 'Жаңылыктар жана окуялар' },
    { id: '67', type: 'page', url: '/news', title: 'Актуальные новости', titleKy: 'Актуалдуу жаңылыктар' },
    { id: '68', type: 'page', url: '/news', title: 'Последние новости', titleKy: 'Акыркы жаңылыктар' },
    { id: '69', type: 'page', url: '/news', title: 'Новости предприятия', titleKy: 'Ишкананын жаңылыктары' },
    { id: '70', type: 'page', url: '/news', title: 'Свежие новости', titleKy: 'Соңку жаңылыктар' },
    { id: '71', type: 'page', url: '/news', title: 'Информация', titleKy: 'Маалымат' },

    { id: '72', type: 'page', url: '/media', title: 'Медиа', titleKy: 'Медиа' },
    { id: '73', type: 'page', url: '/media', title: 'Фото', titleKy: 'Сүрөт' },
    { id: '74', type: 'page', url: '/media', title: 'Видео', titleKy: 'Видео' },
    { id: '75', type: 'page', url: '/media', title: 'Галерея', titleKy: 'Галерея' },
    { id: '77', type: 'page', url: '/media', title: 'СМИ', titleKy: 'ЖМК' },
    { id: '78', type: 'page', url: '/media', title: 'Пресс-релизы', titleKy: 'Пресс-релиздер' },
    { id: '79', type: 'page', url: '/media', title: 'Фотоотчеты', titleKy: 'Фотоотчеттор' },
    { id: '80', type: 'page', url: '/media', title: 'Видеоотчеты', titleKy: 'Видеоотчеттор' },

    { id: '81', type: 'page', url: '/shop', title: 'Магазин контейнеров', titleKy: 'Контейнерлер дүкөнү' },
    { id: '82', type: 'page', url: '/shop', title: 'Купить контейнер для мусора', titleKy: 'Таштанды контейнерин сатып алуу' },
    { id: '83', type: 'page', url: '/shop', title: 'Мусорные баки', titleKy: 'Таштанды бактары' },

    { id: '84', type: 'page', url: '/cart', title: 'Корзина', titleKy: 'Себет' },

    { id: '85', type: 'page', url: '/employee', title: 'Прием граждан', titleKy: 'Жарандарды кабыл алуу' },

    { id: '86', type: 'page', url: '/', title: 'Колл-центр 1400', titleKy: 'Колл-борбор 1400' },

    { id: '87', type: 'page', url: '/directorate', title: 'Осмоналиев Женишбек Анарбекович', titleKy: 'Осмоналиев Женишбек Анарбекович' },
    { id: '89', type: 'page', url: '/directorate', title: 'Иманакунова Бааркан Мелисовна', titleKy: 'Иманакунова Бааркан Мелисовна' },
    { id: '90', type: 'page', url: '/directorate', title: 'Ибраев Кубанычбек Жумалиевич', titleKy: 'Ибраев Кубанычбек Жумалиевич' },
    { id: '91', type: 'page', url: '/directorate', title: 'Иманакунов Улан Маратович', titleKy: 'Иманакунов Улан Маратович' },
];
