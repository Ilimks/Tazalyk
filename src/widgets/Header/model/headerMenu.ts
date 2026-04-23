import { useTranslations } from 'next-intl';

export const useHeaderMenu = () => {
  const t = useTranslations('HeaderMenu');
  
  return [
    { title: t('home'), href: "/", dropdown: null },
    {
      title: t('about'),
      dropdown: [
        { label: t('aboutHistory'), href: "/history" },
        { label: t('aboutDirectorate'), href: "/directorate" },
        { label: t('aboutStructure'), href: "/structure" },
        { label: t('aboutServiceZone'), href: "/services" },
        { label: t('aboutResults'), href: "/results" },
        { label: t('aboutVacancies'), href: "/vacancies" }
      ],
    },
    {
      title: t('subscribers'),
      dropdown: [
        { label: t('subscribersTariffs'), href: "/tariffs" }
      ],
    },
    {
      title: t('pressCenter'),
      dropdown: [
        { label: t('pressCenterNews'), href: "/news" },
        { label: t('pressCenterMedia'), href: "/media" }
      ],
    },
    { title: t('procurement'), href: "/procurement", dropdown: null },
    { 
      title: t('services'),
      dropdown: [
        { label: t('servicesMaterial'), href: "/material" },
        { label: t('servicesTransport'), href: "/transport-services" }
      ]
    },
    {
      title: t('regulatoryFramework'),
      dropdown: [
        { label: t('regulatoryFrameworkLegislation'), href: "/legislation" },
        { label: t('regulatoryFrameworkActs'), href: "/acts" }
      ],
    },
    { title: t('contacts'), href: "/contacts", dropdown: null },
  ];
};

export const socialIcons = [
  {
    key: "facebook",
    src: "/assets/icons/facebook.svg",
    alt: "Facebook",
    link: "https://facebook.com"
  },
  {
    key: "youtube", 
    src: "/assets/icons/youtube.svg",
    alt: "YouTube",
    link: "https://youtube.com"
  },
  {
    key: "instagram",
    src: "/assets/icons/inst.svg",
    alt: "Instagram", 
    link: "https://instagram.com"
  }
];