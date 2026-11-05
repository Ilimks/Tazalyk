import { useTranslations } from 'next-intl';

export const useContactData = () => {
  const t = useTranslations("Contacts");

  const additionalInfo = {
    title: t('ContactsDataTitle'),
    text: t('ContactsDataDescription')
  };

  const contactItems = [
    {
      id: 1,
      icon: 'phone',
      title: t('ContactsDataPhone'),
      details: ['+996 (312) 34-51-02'],
      link: 'tel:+996312345102',
      linkText: t('ContactsCall')
    },
    {
      id: 2,
      icon: 'email',
      title: t('ContactsDataEmail'),
      details: ['tazalyk@meria.kg'],
      link: 'mailto:tazalyk@meria.kg',
      linkText: t('ContactsWrite')
    },
    {
      id: 3,
      icon: 'location',
      title: t('ContactsDataAddress'),
      details: [t('ContactsAddress1'), t('ContactsAddress2')],
      link: 'https://www.google.com/maps/place/%D0%9C%D0%9F+%D0%A2%D0%B0%D0%B7%D0%B0%D0%BB%D1%8B%D0%BA/@42.887574,74.5652683,18.25z/data=!4m14!1m7!3m6!1s0x389ec874124a7213:0x7337bd4801a1dc2f!2zMTkg0KDQvtGB0YLQvtCy0YHQutCw0Y8sINCR0LjRiNC60LXQug!3b1!8m2!3d42.888163!4d74.565109!3m5!1s0x389ec873f46c2ab3:0x4809c2ca8ba82a95!8m2!3d42.886859!4d74.5653055!16s%2Fg%2F11c1mzv1br?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D',
      linkText: t('ContactsRoute')
    },
    {
      id: 4,
      icon: 'schedule',
      title: t('ContactsDataWork'),
      details: [t('ContactsWorkDays'), t('ContactsWeekend')]
    },
    // {
    //   id: 5,
    //   icon: 'social',
    //   title: t('ContactsDataNetwork'),
    //   details: ['Instagram', 'Facebook'],
    //   link: 'https://www.instagram.com/mp_tazalyk_bishkek?igsh=MW51dDdvY2tyaHJxYg==',
    //   linkText: 'Подписаться'
    // }
  ];

  const mapLocations = [
    {
      id: 1,
      lat: 42.88696827273928,
      lon: 74.56530374444422,
      name: t('ContactsMapOffice'),
      address: t('ContactsAddress1')
    },
    {
      id: 2,
      lat: 42.885665545849534,
      lon: 74.57351177508033,
      name: t('ContactsMapBase'),
      address: t('ContactsAddress2')
    }
];

  return {
    additionalInfo,
    contactItems,
    mapLocations,
  };
};