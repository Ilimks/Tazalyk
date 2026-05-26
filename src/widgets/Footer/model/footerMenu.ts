import { useTranslations } from 'next-intl';

type FooterItem = {
  label: string;
  icon?: string;
  href?: string;
};

type FooterSection = {
  title: string;
  items: FooterItem[];
};

export const useFooterNav = () => {
  const t = useTranslations("Footer");
  
  const footerNav: FooterSection[] = [
    {
      title: t("FooterAbout"),
      items: [
        { label: t("FooterAboutHistory"), href: "/history" },
        { label: t("FooterAboutManagement"), href: "/directorate" },
        { label: t("FooterAboutVacancies"), href: "/vacancies" }
      ],
    },
    {
      title: t("FooterSubscribers"),
      items: [
        { label: t("FooterSubscribersTariffs"), href: "/tariffs" },
        { label: t("FooterSubscribersComplaints"), href: "/complaints" },
        { label: t("FooterSubscribersEmployee"), href: "/employee" },
      ],
    },
    {
      title: t("FooterContacts"),
      items: [
        {
          label: "г. Бишкек, ул. Ростовская 19б",
          icon: "/assets/icons/locationFooter.svg",
          href: "https://maps.google.com/?q=Бишкек,+ул.+Ростовская+19б",
        },
        {
          label: "+996 (312) 34-51-02",
          icon: "/assets/icons/phoneFooter.svg",
          href: "tel:+996312345102",
        },
        {
          label: "tazalyk@meria.kg",
          icon: "/assets/icons/emailFooter.svg",
          href: "mailto:tazalyk@meria.kg",
        },
      ],
    },
  ];
  
  return footerNav;
};