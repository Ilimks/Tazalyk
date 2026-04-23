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
      details: ['+996 (312) 12-34-56', '+996 (700) 12-34-56', '+996 (770) 12-34-56'],
      link: 'tel:+996312123456',
      linkText: 'Позвонить'
    },
    {
      id: 2,
      icon: 'email',
      title: t('ContactsDataEmail'),
      details: ['info@tazalyk.kg', 'zakupki@tazalyk.kg'],
      link: 'mailto:info@tazalyk.kg',
      linkText: 'Написать'
    },
    {
      id: 3,
      icon: 'location',
      title: t('ContactsDataAddress'),
      details: ['г. Бишкек, ул. Московская, 123', '720040, Кыргызская Республика'],
      link: 'https://maps.google.com/?q=Бишкек+Московская+123',
      linkText: 'Построить маршрут'
    },
    {
      id: 4,
      icon: 'schedule',
      title: t('ContactsDataNetwork'),
      details: ['Понедельник - Пятница: 09:00 - 18:00', 'Суббота - Воскресенье: Выходной']
    },
    {
      id: 5,
      icon: 'social',
      title: t('ContactsDataNetwork'),
      details: ['Instagram', 'Facebook', 'Telegram'],
      link: 'https://instagram.com',
      linkText: 'Подписаться'
    }
  ];

  const mapLocations = [
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

  return {
    additionalInfo,
    contactItems,
    mapLocations,
  };
};