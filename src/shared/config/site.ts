// Единый адрес сайта для метаданных, sitemap и robots
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mptazalyk.kg').replace(/\/$/, '');

// Контакты организации для структурированных данных (schema.org)
export const ORGANIZATION = {
    phone: '+996312345102',
    email: 'tazalyk@meria.kg',
    city: { ru: 'Бишкек', ky: 'Бишкек' },
    street: { ru: 'ул. Ростовская, 19б', ky: 'Ростовская көч., 19б' },
    // YouTube не указан: в шапке пока стоит заглушка вместо адреса канала
    social: [
        'https://www.facebook.com/share/18aptKGFMg/',
        'https://www.instagram.com/mp_tazalyk_bishkek',
    ],
} as const;
