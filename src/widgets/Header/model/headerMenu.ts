export const headerMenu = [
  { title: "ГЛАВНАЯ", href: "/", dropdown: null },

  {
    title: "О НАС",
    dropdown: [
      { label: "История", href: "/history" },
      { label: "Руководство", href: "/directorate" },
      { label: "Структура и деятельность", href: "/structure" },
      { label: "Зона обслуживания", href: "/services" },
      { label: "Итоги работы", href: "/results" },
      { label: "Вакансии", href: "/vacancies" }
    ],
  },

  {
    title: "АБОНЕНТАМ",
    dropdown: [
      { label: "Тарифы", href: "/tariffs" }
    ],
  },

  {
    title: "ПРЕСС-ЦЕНТР",
    dropdown: [
      { label: "Новости", href: "/news" },
      { label: "Медиа", href: "/media" },
    ],
  },

  { title: "ЗАКУПКИ", href: "/procurement", dropdown: null },

  { title: "КОНТАКТЫ", href: "/contacts", dropdown: null },

  {
    title: "НОРМОТИВНАЯ БАЗА",
    dropdown: [
      { label: "Законодательство КР", href: "/legislation" },
      { label: "Локальные акты", href: "/acts" },
    ],
  },
];

export const socialIcons = [
  {
    key: "facebook",
    src: "/assets/icons/facebook.svg",
    alt: "Facebook",
    link: "https://facebook.com" // Добавьте ссылку
  },
  {
    key: "youtube", 
    src: "/assets/icons/youtube.svg",
    alt: "YouTube",
    link: "https://youtube.com" // Добавьте ссылку
  },
  {
    key: "instagram",
    src: "/assets/icons/inst.svg",
    alt: "Instagram", 
    link: "https://instagram.com" // Добавьте ссылку
  }
];


