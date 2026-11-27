export const OG_IMAGE = '/assets/og-image.jpg';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mptazalyk.kg').replace(/\/$/, '');

export const ORGANIZATION = {
    phone: '+996312345102',
    email: 'tazalyk@bishkek.gov.kg',
    city: { ru: 'Бишкек', ky: 'Бишкек' },
    street: { ru: 'ул. Ростовская, 19б', ky: 'Ростовская көч., 19б' },
    social: [
        'https://www.facebook.com/share/18aptKGFMg/',
        'https://www.instagram.com/mp_tazalyk_bishkek',
    ],
} as const;

export const COMPANY_FACTS = {
    years: 18,
    vehicles: 500,
    employees: 2000,
} as const;
