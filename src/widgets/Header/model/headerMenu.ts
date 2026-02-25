export const headerMenu = [
  { title: "ГЛАВНАЯ", href: "/", dropdown: null },

  {
    title: "О НАС",
    dropdown: [
      { label: "История", href: "/about/history" },
      { label: "Дирекция", href: "/about/management" },
      { label: "Структура и деятельность", href: "/about/structure" },
      { label: "Зона обслуживания", href: "/about/area" },
      { label: "Итоги работы", href: "/about/results" },
      { label: "Вакансии", href: "/about/jobs" },
      { label: "Инновационные технологии", href: "/about/innovation" },
    ],
  },

  {
    title: "АБОНЕНТАМ",
    dropdown: [
      { label: "Тарифы", href: "/clients/tariffs" },
      { label: "Подключение", href: "/clients/connect" },
      { label: "Документы", href: "/clients/docs" },
    ],
  },

  {
    title: "ПРЕСС-ЦЕНТР",
    dropdown: [
      { label: "Новости", href: "/press/news" },
      { label: "Медиа", href: "/press/media" },
    ],
  },

  { title: "ЗАКУПКИ", href: "/purchases", dropdown: null },

  {
    title: "КОНТАКТЫ",
    dropdown: [
      { label: "Контакты", href: "/contacts" },
      { label: "Обратная связь", href: "/contacts/feedback" },
    ],
  },

  { title: "ИНВЕСТОРЫ", href: "/investors", dropdown: null},

  {
    title: "ОТЧЕТЫ",
    dropdown: [
      { label: "Финансовые", href: "/reports/finance" },
      { label: "Годовые", href: "/reports/year" },
    ],
  },

  {
    title: "НОРМОТИВНАЯ БАЗА",
    dropdown: [
      { label: "Финансовые", href: "/reports/finance" },
      { label: "Годовые", href: "/reports/year" },
    ],
  },
];

export const socialIcons = [
  {
    src: "/assets/icons/inst.svg",
    alt: "Instagram",
    key: "inst",
  },
  {
    src: "/assets/icons/facebook.svg",
    alt: "Facebook",
    key: "facebook",
  },
  {
    src: "/assets/icons/youtube.svg",
    alt: "Youtube",
    key: "youtube",
  }
];


