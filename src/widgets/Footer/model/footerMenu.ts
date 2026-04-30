import { useTranslations } from 'next-intl';

type FooterItem = {
  label: string;
  icon?: string;
  href?: string; // Added href property
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
      title: t("FooterServices"),
      items: [
        { label: t("FooterServicesMaterial"), href: "/material" },
        { label: t("FooterServicesTransport"), href: "/transport" }
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
          label: "+996 (312) 123-456",
          icon: "/assets/icons/phoneFooter.svg",
          href: "tel:+996312123456",
        },
        {
          label: "info@tazalyk.kg",
          icon: "/assets/icons/emailFooter.svg",
          href: "mailto:info@tazalyk.kg",
        },
      ],
    },
  ];
  
  return footerNav;
};