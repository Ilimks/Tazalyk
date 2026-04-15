type FooterItem = {
  label: string;
  icon?: string;
};

type FooterSection = {
  title: string;
  items: FooterItem[];
};

export const footerNav: FooterSection[] = [
  {
    title: "О компании",
    items: [
      { label: "История" },
      { label: "Руководство" },
      { label: "Вакансии" },
      { label: "Итоги работы" },
    ],
  },
  {
    title: "Услуги",
    items: [
      { label: "Материальные средства"},
      { label: "Транспортные услуги"}
    ],
  },
  {
    title: "Контакты",
    items: [
      {
        label: "г. Бишкек, ул. Ростовская 19б",
        icon: "/assets/icons/locationFooter.svg",
      },
      {
        label: "+996 (312) 123-456",
        icon: "/assets/icons/phoneFooter.svg",
      },
      {
        label: "info@tazalyk.kg",
        icon: "/assets/icons/emailFooter.svg",
      },
    ],
  },
];
