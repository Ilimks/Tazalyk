import { useTranslations } from 'next-intl';
import { Clock, Headphones, MapPin, Phone, Mail, type LucideIcon } from 'lucide-react';

type FooterItem = {
  label: string;
  icon?: LucideIcon;
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
        { label: t("FooterAboutStructure"), href: "/structure" },
        { label: t("FooterAboutVacancies"), href: "/vacancies" },
        { label: t("FooterAboutNews"), href: "/news" },
      ],
    },
    {
      title: t("FooterSubscribers"),
      items: [
        { label: t("FooterSubscribersTariffs"), href: "/tariffs" },
        // как в верхнем меню «Абонентам»: платные услуги рядом с тарифами
        { label: t("FooterSubscribersServices"), href: "/attendance" },
        { label: t("FooterSubscribersShop"), href: "/shop" },
        { label: t("FooterSubscribersServiceZone"), href: "/services" },
        { label: t("FooterSubscribersComplaints"), href: "/complaints" },
        { label: t("FooterSubscribersEmployee"), href: "/employee" },
      ],
    },
    {
      title: t("FooterDocuments"),
      items: [
        { label: t("FooterDocumentsProcurement"), href: "/procurement" },
        { label: t("FooterDocumentsActs"), href: "/acts" },
        { label: t("FooterDocumentsLegislation"), href: "/legislation" },
      ],
    },
    {
      title: t("FooterContacts"),
      items: [
        {
          label: t("FooterCallCenter"),
          icon: Headphones,
          href: "tel:1400",
        },
        {
          label: "+996 (312) 34-51-02",
          icon: Phone,
          href: "tel:+996312345102",
        },
        {
          label: "tazalyk@bishkek.gov.kg",
          icon: Mail,
          href: "mailto:tazalyk@bishkek.gov.kg",
        },
        {
          label: t("FooterAddress"),
          icon: MapPin,
          href: "https://maps.google.com/?q=Бишкек,+ул.+Ростовская+19б",
        },
        {
          label: t("FooterWorkHours"),
          icon: Clock,
          href: "/contacts",
        },
      ],
    },
  ];
  
  return footerNav;
};